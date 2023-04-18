import ITeamRepository from '../repositories/interface/ITeamRepository';
import ITeamService, { ITeam } from './interfaces/ITeamService';

export default class TeamService implements ITeamService {
  private _teamRepository: ITeamRepository;

  constructor(teamRepository: ITeamRepository) {
    this._teamRepository = teamRepository;
  }

  async getTeams(): Promise<ITeam[]> {
    const teams = await this._teamRepository.getTeams();
    return teams as ITeam[];
  }
}
