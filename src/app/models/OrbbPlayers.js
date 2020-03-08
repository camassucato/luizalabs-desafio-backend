import Sequelize, { Model } from 'sequelize';

class OrbbPlayers extends Model {
  static init(sequelize) {
    super.init(
      {
        match_number: Sequelize.INTEGER,
        player: Sequelize.STRING,
        frags: Sequelize.INTEGER,
      },
      {
        tableName: 'orbb_players',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.OrbbLogs, {
      foreignKey: 'match_number',
      as: 'players',
    });
  }
}

export default OrbbPlayers;
