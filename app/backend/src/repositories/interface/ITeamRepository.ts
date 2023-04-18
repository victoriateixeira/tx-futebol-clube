export default interface ITeamRepository {
  getTeams(): Promise<ITeam>;
}
