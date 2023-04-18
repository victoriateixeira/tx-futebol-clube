/**
* @param {import('sequelize').Sequelize} sequelize
* @param {import('sequelize').DataTypes} sequelize.DataTypes
*/

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      teamName: {
        type: Sequelize.STRING,
        field: 'team_name',
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('teams');
  }
};
