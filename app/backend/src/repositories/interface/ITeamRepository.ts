import { ITeam } from '../../services/interfaces/ITeamService';

export default interface ITeamRepository {
  getAll(): Promise<ITeam[]>;
  getById(id: number): Promise<ITeam>
}
