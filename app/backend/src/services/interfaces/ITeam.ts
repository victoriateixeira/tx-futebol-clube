export interface ITeam {
  id: number
  teamName: string
}

export default interface IUserService {
  getTeams(): Promise<ITeam>
}
