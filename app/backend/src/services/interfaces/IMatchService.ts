export interface IMatch extends IMatchReq {
  id: number
  inProgress: boolean
  // homeTeam: {
  //   teamName: string
  // }
  // awayTeam: {
  //   teamName: string
  // }
}

export interface IMatchReq {
  homeTeamId: number
  homeTeamGoals: number
  awayTeamId: number
  awayTeamGoals: number
}

export default interface IMatchService {
  getAll(): Promise<IMatch[]>
  // getById(id: number): Promise<IMatch>
  searchStatus(status: boolean): Promise<IMatch[]>
  endMatch(id: number): Promise<{ message: string }>
  updateMatch(id: number, homeScore: number, awayScore: number): Promise<string>
  createMatch(match: IMatchReq) : Promise<IMatch>
}
