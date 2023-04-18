export interface ITeam {
  id: number
  teamName: string
}

export default interface ITeamService {
  getAll(): Promise<ITeam[]>
  getById(id: number): Promise<ITeam>
}
