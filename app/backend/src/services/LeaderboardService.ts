import { ILeaderBoard } from '../repositories/interface/ILeaderBoard';
// import IMatchRepository from '../repositories/interface/IMatchRepository';
import ILeaderboardRepository from '../repositories/interface/ILeaderboardRepository';
// import ITeamRepository from '../repositories/interface/ITeamRepository';
// import { IMatch } from './interfaces/IMatchService';
// import ILeaderboardService, { IScoreBoardHome,
//   IScoreBoardAway, IStats } from './interfaces/ILeaderboardService';
import ILeaderboardService from './interfaces/ILeaderboardService';
import { ITypePath } from '../utils/buildQueryLeaderboard';

export default class LeaderboardService implements ILeaderboardService {
  // private _teamRepository: ITeamRepository;
  // private _matchesRepository: IMatchRepository;
  private _leaderboardRepository: ILeaderboardRepository;
  readonly home: ITypePath;
  readonly away: ITypePath;

  constructor(
    leaderboardRepository: ILeaderboardRepository,
    // matchesRepository: IMatchRepository,
    // teamRepository: ITeamRepository,
  ) {
    this._leaderboardRepository = leaderboardRepository;
    this.home = {
      p1goals: 'home_team_goals',
      p1Id: 'home_team_id',
      tableP1Id: 'm.home_team_id',
      p2goals: 'away_team_goals',
    };
    this.away = {
      p1goals: 'away_team_goals',
      p1Id: 'away_team_id',
      tableP1Id: 'm.away_team_id',
      p2goals: 'home_team_goals',
    };
    // this._matchesRepository = matchesRepository;
    // this._teamRepository = teamRepository;
  }

  public async getLeaderboard(path:string): Promise<ILeaderBoard[]> {
    let typePath: ITypePath;
    if (path === '/home') {
      typePath = this.home;
    } else typePath = this.away;
    const leaderboard = await this._leaderboardRepository.getLeaderboard(typePath);
    return leaderboard;
  }

  // static calculateGoals(allHomeTeamMatches: IMatch[], team: string) :number {
  //   return allHomeTeamMatches
  //     .reduce(
  //       (acc: number, obj: IMatch) => acc + Number(obj[team as keyof IMatch]),
  //       0,
  //     );
  // }

  // static sortScoreBoard(scoreBoardArray: IScoreBoardHome[]) {
  //   scoreBoardArray.sort((a, b) => {
  //     if (b.totalPoints > a.totalPoints) return 1;
  //     if (b.totalPoints < a.totalPoints) return -1;
  //     if (b.totalVictories > a.totalVictories) return 1;
  //     if (b.totalVictories < a.totalVictories) return -1;
  //     if (b.goalsBalance > a.goalsBalance) return 1;
  //     if (b.goalsBalance < a.goalsBalance) return -1;
  //     if (b.goalsFavor > a.goalsFavor) return 1;
  //     if (b.goalsFavor < a.goalsFavor) return -1;
  //     return 0;
  //   });

  //   return scoreBoardArray;
  // }

  // async getTeams(team:string): Promise<number[]> {
  //   if (team === 'homeTeam') {
  //     return (await this._leaderboardRepository.getHomeTeams())
  //       .map((match: IMatch) => match.homeTeamId);
  //   }
  //   return (await this._leaderboardRepository.getHomeTeams())
  //     .map((match: IMatch) => match.homeTeamId);
  // }

  // async getAllFinishedMatches(): Promise<IMatch[]> {
  //   const allMatches = await this._matchesRepository.getAll();
  //   const filteredMatches = allMatches.filter((match: IMatch) => !match.inProgress);
  //   return filteredMatches;
  // }

  // async leaderBoardHome():Promise <IScoreBoardHome[] | undefined> {
  //   const homeTeams = await this.getTeams('homeTeam');
  //   const filteredMatches = await this.getAllFinishedMatches();
  //   if (filteredMatches) {
  //     const scoreBoard = Promise.all(homeTeams.map(async (team) => {
  //       const matchesStats = LeaderboardService
  //         .getStats(filteredMatches, team, 'homeTeam', 'awayTeam');
  //       const teamName = await this._teamRepository.getById(team);
  //       return { name: teamName.teamName,
  //         totalPoints: matchesStats.totalDraws + matchesStats.totalVictories * 3,
  //         ...matchesStats,
  //         goalsBalance: matchesStats.goalsFavor - matchesStats.goalsOwn,
  //         efficiency: (((matchesStats.totalDraws + matchesStats.totalVictories * 3)
  //       / (matchesStats.totalGames * 3)) * 100).toFixed(2),

  //       };
  //     }));
  //     return LeaderboardService.sortScoreBoard(await scoreBoard);
  //   }
  // }

  // async leaderBoardAway():Promise <IScoreBoardAway[] | undefined> {
  //   const awayTeams = await this.getTeams('awayTeam');
  //   const filteredMatches = await this.getAllFinishedMatches();
  //   if (filteredMatches) {
  //     const scoreBoard = Promise.all(awayTeams.map(async (team) => {
  //       const matchesStats = LeaderboardService
  //         .getStats(filteredMatches, team, 'awayTeam', 'homeTeam');
  //       const teamName = await this._teamRepository.getById(team);
  //       return { name: teamName.teamName,
  //         totalPoints: matchesStats.totalDraws + matchesStats.totalVictories * 3,
  //         ...matchesStats,
  //         goalsBalance: matchesStats.goalsFavor - matchesStats.goalsOwn,
  //         efficiency: (((matchesStats.totalDraws + matchesStats.totalVictories * 3)
  //       / (matchesStats.totalGames * 3)) * 100).toFixed(2),
  //       };
  //     }));
  //     return LeaderboardService.sortScoreBoard(await scoreBoard);
  //   }
  // }

  // static getStats(allMatches:IMatch[], team:number, mainTeam:string, secondTeam:string): IStats {
  //   const allTeamMatches = allMatches
  //     .filter((match: any) => +match[`${mainTeam}Id`] === +team);

  //   return {
  //     totalGames: allTeamMatches.length,
  //     totalVictories: allTeamMatches
  //       .filter((match: any) => match[`${mainTeam}Goals`]
  //        > match[`${secondTeam}Goals`])
  //       .length,
  //     totalLosses: allTeamMatches
  //       .filter((match: any) => match[`${mainTeam}Goals`] < match[`${secondTeam}Goals`])
  //       .length,
  //     totalDraws: allTeamMatches
  //       .filter((match: any) => match[`${mainTeam}Goals`] === match[`${secondTeam}Goals`])
  //       .length,
  //     goalsFavor: LeaderboardService.calculateGoals(allTeamMatches, `${mainTeam}Goals`),
  //     goalsOwn: LeaderboardService.calculateGoals(allTeamMatches, `${secondTeam}Goals`),

  //   };
  // }
  // static getStats(allMatches:IMatch[], team:number): IStats {
  //   const allHomeTeamMatches = allMatches
  //     .filter((match: IMatch) => +match.homeTeamId === +team);

  //   return {
  //     totalGames: allHomeTeamMatches.length,
  //     totalVictories: allHomeTeamMatches
  //       .filter((match: IMatch) => match.homeTeamGoals > match.awayTeamGoals)
  //       .length,
  //     totalLosses: allHomeTeamMatches
  //       .filter((match: IMatch) => match.homeTeamGoals < match.awayTeamGoals)
  //       .length,
  //     totalDraws: allHomeTeamMatches
  //       .filter((match: IMatch) => match.homeTeamGoals === match.awayTeamGoals)
  //       .length,
  //     goalsFavor: LeaderboardService.calculateGoals(allHomeTeamMatches, 'homeTeamGoals'),
  //     goalsOwn: LeaderboardService.calculateGoals(allHomeTeamMatches, 'awayTeamGoals'),

  //   };
  // }
}
