import IMatchRepository from '../repositories/interface/IMatchRepository';
// import Match from '../database/models/Match';
import IMatchService, { IMatch } from './interfaces/IMatchService';

export default class MatchService implements IMatchService {
  private _matchRepository: IMatchRepository;

  constructor(matchRepository: IMatchRepository) {
    this._matchRepository = matchRepository;
  }

  async getAll(): Promise<IMatch[]> {
    const matches = await this._matchRepository.getAll();
    return matches;
  }

  async getById(id: number): Promise<IMatch> {
    const match = await this._matchRepository.getById(id);
    return match;
  }

  async searchStatus(status: boolean):Promise<IMatch[]> {
    const matches = await this._matchRepository.searchStatus(status);
    return matches;
  }

  async endMatch(id: number): Promise<{ message: string }> {
    const end = await this._matchRepository.endMatch(id);
    return end;
  }
}
