module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orbb_players', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      match_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'orbb_logs',
          key: 'match_number',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      player: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      frags: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('orbb_players');
  },
};
