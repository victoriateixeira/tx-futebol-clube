import ITeamRepository from '../repositories/interface/ITeamRepository';
import TeamValidation from '../validations/TeamValidations';
import BadRequestError from '../errors/bad-request-error';
import IMatchRepository from '../repositories/interface/IMatchRepository';
// import Match from '../database/models/Match';
import IMatchService, { IMatch, IMatchReq } from './interfaces/IMatchService';
import ITeamValidation from '../validations/interfaces/ITeamValidation';

export default class MatchService implements IMatchService {
  private _matchRepository: IMatchRepository;
  private _validateTeams: ITeamValidation;
  private _teamRepository: ITeamRepository;

  constructor(matchRepository: IMatchRepository, teamRepository: ITeamRepository) {
    this._matchRepository = matchRepository;
    this._validateTeams = new TeamValidation(teamRepository);
    this._teamRepository = teamRepository;
  }

  async getAll(): Promise<IMatch[]> {
    const matches = await this._matchRepository.getAll();
    return matches;
  }

  async searchStatus(status: boolean):Promise<IMatch[]> {
    const matches = await this._matchRepository.searchStatus(status);
    return matches;
  }

  async endMatch(id: number): Promise<{ message: string }> {
    const end = await this._matchRepository.endMatch(id);
    return end;
  }

  async updateMatch(id: number, homeScore: number, awayScore: number): Promise<string> {
    const upd = await this._matchRepository.updateMatch(id, homeScore, awayScore);
    return upd;
  }

  async createMatch(match: IMatchReq): Promise<IMatch> {
    const { homeTeamId, awayTeamId } = match;
    if (homeTeamId === awayTeamId) {
      throw new BadRequestError('It is not possible to create a match with two equal teams');
    }
    await this._validateTeams.validateTeams(homeTeamId, awayTeamId);
    const newMatch = await this._matchRepository.createMatch(match);
    return newMatch;
  }
}
