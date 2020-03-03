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
}

export default new ApiController();
