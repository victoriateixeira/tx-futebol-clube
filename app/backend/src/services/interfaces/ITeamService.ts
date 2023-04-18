export interface ITeam {
  id: number
  teamName: string
}

export default interface ITeamService {
  getTeams(): Promise<ITeam[]>
}
