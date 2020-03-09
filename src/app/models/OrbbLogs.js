import Sequelize, { Model } from 'sequelize';

class OrbbLogs extends Model {
  static init(sequelize) {
    super.init(
      {
        match_number: Sequelize.INTEGER,
        match_datetime: Sequelize.DATE,
        map: Sequelize.STRING,
        capture_limit: Sequelize.INTEGER,
        frag_limit: Sequelize.INTEGER,
        time_limit: Sequelize.INTEGER,
        server: Sequelize.STRING,
      },
      {
        tableName: 'orbb_logs',
        sequelize,
      }
    );

    return this;
  }
}

export default OrbbLogs;
