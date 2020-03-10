import filesys from 'fs';
import path from 'path';
import sequelize from 'sequelize';
import { format } from 'date-fns';
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

    //
    // POPULATE DB TABLE ORBB_LOGS
    //
    parser.map(match => {
      const payload = {
        match_number: match.game.match_number,
        match_datetime: match.game.match_datetime,
        map: match.game.map,
        capture_limit: match.game.capture_limit,
        frag_limit: match.game.frag_limit,
        time_limit: match.game.time_limit,
        server: match.game.server,
      };
      OrbbLogs.create(payload);
      return null;
    });

    //
    // POPULATE DB TABLE ORBB_PLAYERS
    //
    parser.map(match => {
      const { players } = match.game;
      Object.keys(players).map(function createPlayers(player) {
        //
        // DB PAYLOAD
        //
        const payload_players = {
          match_number: match.game.match_number,
          player: players[player],
        };
        //
        // POPULATE DB TABLE ORBB_PLAYERS
        //
        OrbbPlayers.create(payload_players);
        return null;
      });

      return null;
    });

    //
    // UPDATE DB TABLE ORBB_PLAYERS
    //
    parser.map(match => {
      const { frags } = match.game;
      Object.keys(frags).map(function updatePlayerFrags(player) {
        //
        // UPDATE DB TABLE ORBB_PLAYERS WITH FRAG INFO
        //
        OrbbPlayers.update(
          {
            frags: frags[player],
          },
          {
            where: {
              match_number: match.game.match_number,
              player,
            },
          }
        );
        return null;
      });

      return null;
    });

    //
    // RETURN GAME LOG JSON
    //
    return res.json(parser);
  }

  //
  //
  //
  // LIST ALL MATCH DETAILS
  //
  //
  async doMatch(req, res) {
    //
    // PARSE MATCH DATA
    //
    const { match_number } = req.body;
    if (!match_number) {
      return res.status(400).json({ error: 'PLEASE INFORM MATCH NUMBER' });
    }
    //
    // QUERY MATCH DATA
    //
    const match = await OrbbLogs.findOne({
      attributes: [
        'match_number',
        'match_datetime',
        'map',
        'capture_limit',
        'frag_limit',
        'time_limit',
        'server',
      ],
      where: {
        match_number,
      },
    });
    //
    // 404 IF NOT FOUND
    //
    if (!match) {
      return res.status(404).json({ error: 'MATCH NOT FOUND' });
    }
    //
    // RETURN MATCH DATA
    //
    const { map, capture_limit, frag_limit, time_limit, server } = match;
    const match_datetime = format(match.match_datetime, 'yyyy-MM-dd HH:mm');
    return res.json({
      match_number,
      match_datetime,
      map,
      capture_limit,
      frag_limit,
      time_limit,
      server,
    });
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
