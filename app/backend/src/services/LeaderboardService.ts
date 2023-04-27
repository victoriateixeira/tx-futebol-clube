import IMatchRepository from '../repositories/interface/IMatchRepository';
import ILeaderboardRepository from '../repositories/interface/ILeaderboardRepository';
import ITeamRepository from '../repositories/interface/ITeamRepository';
import { IMatch } from './interfaces/IMatchService';
import ILeaderboardService, { IScoreBoard, IStats } from './interfaces/ILeaderboardService';

export default class LeaderboardService implements ILeaderboardService {
  private _teamRepository: ITeamRepository;
  private _matchesRepository: IMatchRepository;
  private _leaderboardRepository: ILeaderboardRepository;

  constructor(
    leaderboardRepository: ILeaderboardRepository,
    matchesRepository: IMatchRepository,
    teamRepository: ITeamRepository,
  ) {
    this._leaderboardRepository = leaderboardRepository;
    this._matchesRepository = matchesRepository;
    this._teamRepository = teamRepository;
  }

  static calculateGoals(allHomeTeamMatches: IMatch[], team: string) :number {
    return allHomeTeamMatches
      .reduce(
        (acc: number, obj: IMatch) => acc + Number(obj[team as keyof IMatch]),
        0,
      );
  }

  // static sortLeaderBoard(scoreBoardArray: IScoreBoard[]) {
  //   LeaderboardService.sortGoalsFavor(LeaderboardService
  //     .sortGoalsBalance(LeaderboardService
  //       .sortTotalPoints(scoreBoardArray)));
  // }

  static sortScoreBoard(scoreBoardArray: IScoreBoard[]) {
    scoreBoardArray.sort((a, b) => {
      if (b.totalPoints > a.totalPoints) return 1;
      if (b.totalPoints < a.totalPoints) return -1;
      if (b.goalsBalance > a.goalsBalance) return 1;
      if (b.goalsBalance < a.goalsBalance) return -1;
      if (b.goalsFavor > a.goalsFavor) return 1;
      if (b.goalsFavor < a.goalsFavor) return -1;
      return 0;
    });
    return scoreBoardArray;
  }

  static sortLeaderboard(scoreBoardArray: IScoreBoard[]) {
    const sortTotalPoints = scoreBoardArray.sort((a, b) => b.totalPoints - a.totalPoints);
    const sortGoalsBalance = sortTotalPoints.sort((a, b) => b.goalsBalance - a.goalsBalance);
    const sortGoalsFavor = sortGoalsBalance.sort((a, b) => b.goalsFavor - a.goalsFavor);
    return sortGoalsFavor;
  }

  // static sortGoalsBalance(scoreBoardArray: IScoreBoard[]) {
  //   const sortGoalsBalance = scoreBoardArray.sort((a, b) => {
  //     if (a.goalsBalance < b.goalsBalance) {
  //       return -1;
  //     }
  //     if (a.goalsBalance > b.goalsBalance) {
  //       return 1;
  //     }
  //     return 0;
  //   });
  //   return sortGoalsBalance;
  // }

  // static sortGoalsFavor(scoreBoardArray: IScoreBoard[]) {
  //   const sortGoalsFavor = scoreBoardArray.sort((a, b) => {
  //     if (a.goalsFavor < b.goalsFavor) {
  //       return -1;
  //     }
  //     if (a.goalsFavor > b.goalsFavor) {
  //       return 1;
  //     }
  //     return 0;
  //   });
  //   return sortGoalsFavor;
  // }

  async leaderBoardHome():Promise < IScoreBoard[] | undefined> {
    const homeTeams = (await this._leaderboardRepository.getHomeTeams())
      .map((match) => match.homeTeamId);
    const allMatches = await this._matchesRepository.getAll();
    const filteredMatches = allMatches.filter((match: IMatch) => !match.inProgress);
    if (filteredMatches) {
      const scoreBoard = Promise.all(homeTeams.map(async (team) => {
        const matchesStats = LeaderboardService.getStats(filteredMatches, team);
        const teamName = await this._teamRepository.getById(team);
        return { name: teamName.teamName,
          ...matchesStats,
          totalPoints: matchesStats.totalDraws + matchesStats.totalVictories * 3,
          goalsBalance: matchesStats.goalsFavor - matchesStats.goalsOwn,
          efficiency: Number((((matchesStats.totalDraws + matchesStats.totalVictories)
        / (matchesStats.totalGames * 3)) * 100).toFixed(2)),

        };
      }));
      return LeaderboardService.sortScoreBoard(await scoreBoard);
    }
  }

  static getStats(allMatches:IMatch[], team:number): IStats {
    const allHomeTeamMatches = allMatches
      .filter((match: IMatch) => +match.homeTeamId === +team);

    return {
      totalGames: allHomeTeamMatches.length,
      totalVictories: allHomeTeamMatches
        .filter((match: IMatch) => match.homeTeamGoals > match.awayTeamGoals)
        .length,
      totalLosses: allHomeTeamMatches
        .filter((match: IMatch) => match.homeTeamGoals < match.awayTeamGoals)
        .length,
      totalDraws: allHomeTeamMatches
        .filter((match: IMatch) => match.homeTeamGoals === match.awayTeamGoals)
        .length,
      goalsFavor: LeaderboardService.calculateGoals(allHomeTeamMatches, 'homeTeamGoals'),
      goalsOwn: LeaderboardService.calculateGoals(allHomeTeamMatches, 'awayTeamGoals'),

    };
  }
}
