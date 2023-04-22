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
}
