import filesys from 'fs';
import path from 'path';
import sequelize from 'sequelize';
import Orbb from '../../lib/OrbbLogParser';
import OrbbPlayers from '../models/OrbbPlayers';
import OrbbLogs from '../models/OrbbLogs';

class ApiController {
  //
  //
  //
  // INDEX
  //
  //
  async doIndex(req, res) {
    return res.json({
      api_name: 'LUIZALABS-DESAFIO-BACKEND',
      api_dev: 'Carlos Augusto Massucato',
    });
  }

  //
  //
  //
  // PARSER
  //
  //
  async doParser(req, res) {
    //
    // READ LOCAL TMP GAMES.LOG
    //
    const gamelog = filesys.readFileSync(
      path.resolve(__dirname, process.env.TMP_DIR, process.env.TMP_LOG)
    );

    //
    // RESET LOG IN DB
    //
    await OrbbPlayers.destroy({ where: {} });
    await OrbbLogs.destroy({ where: {} });

    //
    // START PARSER
    //
    const parser = Orbb.watcher(gamelog);

    return res.json(parser);
  }

  //
  //
  //
  // LIST ALL PLAYERS ON THE GAMES.LOG
  //
  //
  async doPlayers(req, res) {
    //
    // LIST ALL PLAYERS
    //
    const players = await OrbbPlayers.findAll({
      attributes: [
        [sequelize.fn('DISTINCT', sequelize.col('player')), 'player'],
      ],
      where: {},
    });
    return res.json(players);
  }

  //
  //
  //
  // LIST ALL PLAYED MAPS ON THE GAMES.LOG
  //
  //
  async doMaps(req, res) {
    //
    // LIST ALL MAPS
    //
    const maps = await OrbbLogs.findAll({
      attributes: [
        [sequelize.fn('DISTINCT', sequelize.col('map')), 'map'],
        [sequelize.fn('COUNT', sequelize.col('map')), 'times_played'],
      ],
      group: ['map'],
      order: [[sequelize.literal('times_played'), 'DESC']],
    });
    return res.json(maps);
  }

  //
  //
  //
  // LIST PLAYERS RANKING
  //
  //
  async doRanking(req, res) {
    //
    // RANKING
    //
    const ranking = await OrbbPlayers.findAll({
      attributes: [
        'player',
        [sequelize.fn('SUM', sequelize.col('frags')), 'total_frags'],
      ],
      group: ['player'],
      order: [[sequelize.literal('total_frags'), 'DESC']],
    });
    return res.json(ranking);
  }
}

export default new ApiController();
