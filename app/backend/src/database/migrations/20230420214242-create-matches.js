/**
* @param {import('sequelize').Sequelize} sequelize
* @param {import('sequelize').DataTypes} sequelize.DataTypes
*/

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.createTable('matches', {
id:{
  primaryKey: true,
  type: Sequelize.INTEGER,
  allowNull: false,
  autoIncrement: true,
},
homeTeamId: {
  type: Sequelize.INTEGER,
  allowNull: false,
  field: 'home_team_id',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
  references:{
    model: 'teams',
    key: 'id',
  }

},
homeTeamGoals: {
  type: Sequelize.INTEGER,
  allowNull: false,
  field: 'home_team_goals'

},
awayTeamId: {
  type: Sequelize.INTEGER,
  allowNull: false,
  field: 'away_team_id',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
  references:{
    model: 'teams',
    key: 'id',
},
},
awayTeamGoals: {
  type: Sequelize.INTEGER,
  allowNull: false,
  field: 'away_team_goals'
},
inProgress: {
  type: Sequelize.BOOLEAN,
  allowNull: false,
  field: 'in_progress',
  defaultValue: true
},
  });
  },

  down: async (queryInterface, Sequelize) => {
 await queryInterface.dropTable('users');
  }
};
