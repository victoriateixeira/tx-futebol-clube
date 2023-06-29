import { Request, Response, NextFunction } from 'express';
import ILeaderboardService from '../services/interfaces/ILeaderboardService';
import ILeaderboardController from './interfaces/leaderboard-controller';

export default class LeaderboardController implements ILeaderboardController {
  private _leaderboardService: ILeaderboardService;

  constructor(leaderboardService: ILeaderboardService) {
    this._leaderboardService = leaderboardService;
  }

  public async getLeaderboard(
    req: Request,
    res:Response,
    next: NextFunction,
  ) : Promise<Response | void> {
    const { path } = req;
    try {
      const leaderboard = await this._leaderboardService.getLeaderboard(path);
      return res.status(200).json(leaderboard);
    } catch (error) {
      return next(error);
    }
  }
}
