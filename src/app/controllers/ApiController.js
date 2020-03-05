import filesys from 'fs';
import path from 'path';
import Orbb from '../../lib/OrbbLogParser';

class ApiController {
  //
  //
  //
  // INDEX
  //
  //
  async index(req, res) {
    return res.json({
      api_name: 'LUIZALABS-DESAFIO-BACKEND',
      api_dev: 'Carlos Massucato',
    });
  }

  //
  //
  //
  // PARSER
  //
  //
  async parser(req, res) {
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
}

export default new ApiController();
