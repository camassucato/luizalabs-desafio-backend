import filesys from 'fs';
import path from 'path';
import Orbb from '../../lib/OrbbLogParser';
// import OrbbLogs from '../models/OrbbLogs';
import OrbbPlayers from '../models/OrbbPlayers';

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
      attributes: ['player'],
      group: ['player'],
      raw: true,
    });
    return res.json(players);
  }
}

export default new ApiController();
