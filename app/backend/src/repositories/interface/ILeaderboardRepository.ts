import { IMatch } from '../../services/interfaces/IMatchService';

export default interface ILeaderboardRepository {
  getHomeTeams(): Promise<IMatch[]>
  getAwayTeams(): Promise<IMatch[]>
}
