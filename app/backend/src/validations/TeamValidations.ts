import ITeamRepository from '../repositories/interface/ITeamRepository';
import ITeamValidation from './interfaces/ITeamValidation';

export default class TeamValidation implements ITeamValidation {
  private _teamRepository: ITeamRepository;
  constructor(teamRepository: ITeamRepository) {
    this._teamRepository = teamRepository;
  }

  async validateTeams(homeTeamId: number, awayTeamId: number): Promise<void> {
    await this._teamRepository.getById(homeTeamId);
    await this._teamRepository.getById(awayTeamId);
    // const valid = homeTeam && awayTeam;
    // if (!valid) { throw new NotFoundError('There is no team with such id!'); }
  }
}
