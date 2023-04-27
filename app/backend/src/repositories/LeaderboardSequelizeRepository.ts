import * as sequelize from 'sequelize';

import ILeaderboardRepository from './interface/ILeaderboardRepository';
import Match from '../database/models/Match';
import { IMatch } from '../services/interfaces/IMatchService';

export default class LeaderboardRepository implements ILeaderboardRepository {
  constructor(private _matchModel = Match) {}

  public async getHomeTeams(): Promise<IMatch[]> {
    const homeTeams = await this._matchModel.findAll({
      where: { inProgress: false },
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('home_team_id')), 'homeTeamId']],
      raw: true,
    });
    return homeTeams;
  }

  public async getAwayTeams(): Promise<IMatch[]> {
    const awayTeams = await this._matchModel.findAll({
      where: { inProgress: false },
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('away_team_id')), 'awayTeamId']],
      raw: true,
    });
    return awayTeams;
  }
}
