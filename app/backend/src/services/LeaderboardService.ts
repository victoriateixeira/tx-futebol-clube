import ILeaderboardRepository from '../repositories/interface/ILeaderboardRepository';
// import IMatchRepository from '../repositories/interface/IMatchRepository';
// import ITeamRepository from '../repositories/interface/ITeamRepository';
// import ILoginService from './interfaces/ILoginService';
import ILeaderboardService from './interfaces/ILeaderboarService';
import { IMatch } from './interfaces/IMatchService';

export default class LeaderboardService implements ILeaderboardService {
  // private _teamRepository: ITeamRepository;
  // private _matchesRepository: IMatchRepository;
  private _leaderboardRepository: ILeaderboardRepository;

  constructor(leaderboardRepository: ILeaderboardRepository) {
    this._leaderboardRepository = leaderboardRepository;
  }

  public async leaderboardHome(): Promise <IMatch[]> {
    const homeTeams = await this._leaderboardRepository.getHomeTeams();
    return homeTeams;
    // const homeTeams = allMatches.filter((match) => match.homeTeamId);
  }
}
