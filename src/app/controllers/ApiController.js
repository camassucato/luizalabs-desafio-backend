class ApiController {
  //
  //
  //
  // INDEX
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
  async parser(req, res) {
    return res.json({
      mano: 'teste',
    });
  }
}

export default new ApiController();
