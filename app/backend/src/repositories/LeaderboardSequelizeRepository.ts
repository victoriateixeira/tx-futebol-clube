// import * as sequelize from 'sequelize';
import { QueryTypes, Sequelize } from 'sequelize';
import getQuery from '../utils/buildQueryLeaderboard';
import db from '../database/models';
import ITypePath from '../utils/interfaces/ITypePath';
import ILeaderboardRepository from './interface/ILeaderboardRepository';
// import Match from '../database/models/Match';
// import { IMatch } from '../services/interfaces/IMatchService';
import { ILeaderBoard } from './interface/ILeaderBoard';
// import { ITypePath, getQuery } from '../utils/buildQueryLeaderboard.ts';

export default class LeaderboardRepository implements ILeaderboardRepository {
  constructor(
    // private _matchModel = Match
    private _db: Sequelize = db,
  ) {}

  // public async getHomeTeams(): Promise<IMatch[]> {
  //   const homeTeams = await this._matchModel.findAll({
  //     where: { inProgress: false },
  //     attributes: [[sequelize.fn('DISTINCT', sequelize.col('home_team_id')), 'homeTeamId']],
  //     raw: true,
  //   });
  //   console.log(homeTeams);
  //   return homeTeams;
  // }

  // public async getAwayTeams(): Promise<IMatch[]> {
  //   const awayTeams = await this._matchModel.findAll({
  //     where: { inProgress: false },
  //     attributes: [[sequelize.fn('DISTINCT', sequelize.col('away_team_id')), 'awayTeamId']],
  //     raw: true,
  //   });
  //   return awayTeams;
  // }

  public async getLeaderboard(typePath: ITypePath): Promise<ILeaderBoard[]> {
    const leaderboard = await this._db.query(
      `${getQuery(typePath)}`,
      { type: QueryTypes.SELECT },
    );
    return leaderboard as ILeaderBoard[];
  }
}
