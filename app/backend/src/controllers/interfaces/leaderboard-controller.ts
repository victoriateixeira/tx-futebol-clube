import { Request, Response, NextFunction } from 'express';

export default interface ILeaderboardController {
  leaderboardHome(req: Request, res: Response, next: NextFunction): Promise<Response | void>

}
