import { ITeam } from '../../services/interfaces/ITeamService';

export default interface ITeamRepository {
  getTeams(): Promise<ITeam[]>;
}
