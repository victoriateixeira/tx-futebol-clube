import { IMatch } from '../../services/interfaces/IMatchService';

export default interface ILeaderboardRepository {
  getHomeTeams(): Promise<IMatch[]>
}
