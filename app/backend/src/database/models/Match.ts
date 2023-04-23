import { BOOLEAN, INTEGER, STRING, Model } from 'sequelize';
import db from '.';
import Team from './Team';

class Match extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}
Match.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,

  },
  awayTeamId: {
    type: INTEGER,
    allowNull: false,

  },
  awayTeamGoals: {
    type: STRING,
    allowNull: false,

  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: true,

  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Match.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Match.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeam' });

Team.hasMany(Match, { foreignKey: 'homeTeamId', as: 'matchHome' });
Team.hasMany(Match, { foreignKey: 'awayTeamId', as: 'matchAway' });

export default Match;
