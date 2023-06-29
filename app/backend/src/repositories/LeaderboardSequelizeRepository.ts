import { QueryTypes, Sequelize } from 'sequelize';
import getQuery from '../utils/getQueryLeaderboard';
import db from '../database/models';
import ITypePath from '../utils/interfaces/ITypePath';
import ILeaderboardRepository from './interface/ILeaderboardRepository';
import { ILeaderBoard } from './interface/ILeaderBoard';

export default class LeaderboardRepository implements ILeaderboardRepository {
  constructor(

    private _db: Sequelize = db,
  ) {}

  public async getLeaderboard(typePath: ITypePath): Promise<ILeaderBoard[]> {
    const leaderboard = await this._db.query(
      `${getQuery(typePath)}`,
      { type: QueryTypes.SELECT },
    );
    return leaderboard as ILeaderBoard[];
  }
}
