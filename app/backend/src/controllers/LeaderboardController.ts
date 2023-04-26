import { Request, Response, NextFunction } from 'express';
import ILeaderboardService from '../services/interfaces/ILeaderboardService';
import ILeaderboardController from './interfaces/leaderboard-controller';

export default class LeaderboardController implements ILeaderboardController {
  private _leaderboardService: ILeaderboardService;

  constructor(leaderboardService: ILeaderboardService) {
    this._leaderboardService = leaderboardService;
  }

  public async leaderboardHome(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const homeTeams = await this._leaderboardService.leaderBoardHome();
      return res.status(200).json(homeTeams);
    } catch (error) {
      return next(error);
    }
  }
}
