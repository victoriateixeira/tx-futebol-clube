import { ILeaderBoard } from './ILeaderBoard';
import ITypePath from '../../utils/interfaces/ITypePath';

export default interface ILeaderboardRepository {
  getLeaderboard(typePath: ITypePath): Promise<ILeaderBoard[]>
}
