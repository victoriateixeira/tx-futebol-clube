import { ITeam } from '../services/interfaces/ITeamService';
import Team from '../database/models/Team';
import ITeamRepository from './interface/ITeamRepository';

export default class TeamSequelizeRepository implements ITeamRepository {
  constructor(private _teamModel = Team) {}

  async getAll(): Promise<ITeam[]> {
    const teams = await this._teamModel.findAll();
    return teams;
  }
}
