module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orbb_logs', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      match_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      match_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      map: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      capture_limit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      frag_limit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      time_limit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      server: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('orbb_logs');
  },
};
