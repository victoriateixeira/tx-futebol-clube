import * as sequelize from 'sequelize';

import ILeaderboardRepository from './interface/ILeaderboardRepository';
import Match from '../database/models/Match';
import { IMatch } from '../services/interfaces/IMatchService';

export default class LeaderboardRepository implements ILeaderboardRepository {
  constructor(private _matchModel = Match) {}

  public async getHomeTeams(): Promise<IMatch[]> {
    const homeTeams = await this._matchModel.findAll({
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('home_team_id')), 'homeTeamId']],
      where: { inProgress: false },
    });
    console.log(homeTeams);
    return homeTeams;
  }
}