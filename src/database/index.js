import Sequelize from 'sequelize';
import OrbbLogs from '../app/models/OrbbLogs';
import OrbbPlayers from '../app/models/OrbbPlayers';
import databaseConfig from '../config/database';

const models = [OrbbLogs, OrbbPlayers];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
