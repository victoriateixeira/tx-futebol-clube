import Team from '../database/models/Team';
import ITeamRepository from './interface/ITeamRepository';

export default class TeamSequelizeRepository implements ITeamRepository {
  constructor(private _teamModel = Team) {}

  async getTeams(): Promise<ITeam> {
    const teams = await this._teamModel.findAll();
    return teams;
  }
}