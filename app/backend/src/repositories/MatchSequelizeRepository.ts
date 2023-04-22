import NotFoundError from '../errors/notFound-error';
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

  async searchStatus(status: boolean): Promise<IMatch[]> {
    const filteredMatches = await this._matchModel.findAll({
      include: [{ model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } }],
      where: { inProgress: status },
    });
    if (!filteredMatches) throw new NotFoundError('No matches found');
    return filteredMatches;
  }

  async endMatch(id: number): Promise<{ message: string; }> {
    await this._matchModel.update(
      {
        inProgress: false,
      },
      { where: { id } },
    );
    return { message: 'Finished' };
  }
}
