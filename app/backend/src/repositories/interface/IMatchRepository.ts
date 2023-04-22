// import Match from '../../database/models/Match';
import { IMatch } from '../../services/interfaces/IMatchService';

export default interface IMatchRepository {
  getAll(): Promise<IMatch[]>;
  getById(id: number): Promise<IMatch>
  searchStatus(status: boolean): Promise<IMatch[]>
  endMatch(id: number): Promise<{ message: string }>
  updateMatch(id: number, scoreHome: number, scoreAway: number): Promise <string>
}
