import NotFoundError from '../errors/notFound-error';
import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { IMatch, IMatchReq } from '../services/interfaces/IMatchService';
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

  async getById(id: number): Promise<IMatch> {
    const match = await this._matchModel.findByPk(id);
    if (!match) { throw new NotFoundError('ID not found'); }
    return match;
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
    await this.getById(id);
    await this._matchModel.update(
      {
        inProgress: false,
      },
      { where: { id } },
    );
    return { message: 'Finished' };
  }

  async updateMatch(id: number, scoreHome: number, scoreAway: number): Promise<string> {
    await this.getById(id);
    await this._matchModel.update(
      {
        homeTeamGoals: scoreHome,
        awayTeamGoals: scoreAway,
      },
      { where: { id } },
    );
    return 'Scores updated!';
  }

  async createMatch(match: IMatchReq): Promise<Match> {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = match;
    const newMatch = await this._matchModel
      .create({ homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals });
    return newMatch;
  }
}
