// import Match from '../../database/models/Match';

import { IMatch } from '../../services/interfaces/IMatchService';

export default interface ILeaderboardRepository {
  getHomeTeams(): Promise<IMatch[]>
}
