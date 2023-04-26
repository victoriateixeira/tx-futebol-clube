import * as Sequelize from 'sequelize';

import ILeaderboardRepository from './interface/ILeaderboardRepository';
import Match from '../database/models/Match';
import { IMatch } from '../services/interfaces/IMatchService';

export default class LeaderboardRepository implements ILeaderboardRepository {
  constructor(private _matchModel = Match) {}

  public async getHomeTeams(): Promise<IMatch[]> {
    const homeTeams = await this._matchModel.findAll({
      attributes: ['homeTeamId',
        [Sequelize.fn('DISTINCT', Sequelize.col('homeTeamId')), 'homeTeamId']],
    });
    console.log(homeTeams);
    return homeTeams;
  }
}
