import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { IMatch } from '../services/interfaces/IMatchService';
import IMatchRepository from './interface/IMatchRepository';

export default class MatchSequelizeRepository implements IMatchRepository {
  constructor(private _matchModel = Match) {}

  async getAll(): Promise<IMatch[]> {
    const matches = await this._matchModel.findAll({
      include: [{ model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } }],
    });
    return matches;
  }
}
