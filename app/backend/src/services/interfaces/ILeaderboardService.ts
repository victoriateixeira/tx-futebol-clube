// import { IMatch } from './IMatchService';

export interface IScoreBoard extends IStats {
  name: string,
  totalPoints: number,
  goalsBalance: number,
  efficiency: string,
}
export interface IStats {
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,

}
export default interface ILeaderboardService {
  // calculateGoals (allHomeTeamMatches: IMatch[], team: string): number[]
  // getStats (allMatches:IMatch[], team:number): IStats[]
  leaderBoardHome(): Promise<IScoreBoard[] | undefined>
}
