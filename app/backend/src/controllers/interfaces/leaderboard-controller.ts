import { Request, Response, NextFunction } from 'express';

export default interface ILeaderboardController {
  getLeaderboard(req: Request, res: Response, next: NextFunction): Promise<Response | void>

}
