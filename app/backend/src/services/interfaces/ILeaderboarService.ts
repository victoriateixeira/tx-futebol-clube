import { IMatch } from './IMatchService';

export default interface ILeaderboardService {
  leaderboardHome (): Promise<IMatch[]>
}
