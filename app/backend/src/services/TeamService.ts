import ITeamRepository from '../repositories/interface/ITeamRepository';
import IUserService, { ITeam } from './interfaces/ITeam';

export default class TeamService implements IUserService {
  private _teamRepository: ITeamRepository;

  constructor(teamRepository: ITeamRepository) {
    this._teamRepository = teamRepository;
  }

  async getTeams(): Promise<ITeam> {
    const teams = await this._teamRepository.getTeams();
    return teams;
  }
}
