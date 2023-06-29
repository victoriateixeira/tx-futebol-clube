import { ILeaderBoard } from '../repositories/interface/ILeaderBoard';

import ILeaderboardRepository from '../repositories/interface/ILeaderboardRepository';

import ILeaderboardService from './interfaces/ILeaderboardService';

import ITypePath from '../utils/interfaces/ITypePath';

export default class LeaderboardService implements ILeaderboardService {
  private _leaderboardRepository: ILeaderboardRepository;
  readonly home: ITypePath;
  readonly away: ITypePath;

  constructor(
    leaderboardRepository: ILeaderboardRepository,

  ) {
    this._leaderboardRepository = leaderboardRepository;
    this.home = {
      p1goals: 'home_team_goals',
      p1Id: 'home_team_id',
      tableP1Id: 'm.home_team_id',
      p2goals: 'away_team_goals',
    };
    this.away = {
      p1goals: 'away_team_goals',
      p1Id: 'away_team_id',
      tableP1Id: 'm.away_team_id',
      p2goals: 'home_team_goals',
    };
  }

  public async getLeaderboard(path:string): Promise<ILeaderBoard[]> {
    let typePath: ITypePath;
    if (path === '/home') {
      typePath = this.home;
    } else typePath = this.away;
    const leaderboard = await this._leaderboardRepository.getLeaderboard(typePath);
    return leaderboard;
  }
}
