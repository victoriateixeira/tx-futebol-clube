// import { IMatch } from '../../services/interfaces/IMatchService';
// import { ITypePath } from '../../utils/buildQueryLeaderboard';
import { ILeaderBoard } from './ILeaderBoard';
import { ITypePath } from '../../utils/buildQueryLeaderboard';

export default interface ILeaderboardRepository {
  // getHomeTeams(): Promise<IMatch[]>
  // getAwayTeams(): Promise<IMatch[]>
  getLeaderboard(typePath: ITypePath): Promise<ILeaderBoard[]>
}
