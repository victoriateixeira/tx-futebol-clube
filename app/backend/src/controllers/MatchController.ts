import { NextFunction, Request, Response } from 'express';
import IMatchController from './interfaces/match-controller';
import IMatchService from '../services/interfaces/IMatchService';

export default class MatchController implements IMatchController {
  private _matchService: IMatchService;

  constructor(matchService: IMatchService) {
    this._matchService = matchService;
  }

  // async getAll(_req: Request, res: Response, _next: NextFunction): Promise<Response | void> {
  //   const matches = await this._matchService.getAll();
  //   return res.status(200).json(matches);
  // }

  async searchStatus(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { inProgress } = req.query;
      if (inProgress === undefined) {
        const matches = await this._matchService.getAll();
        return res.status(200).json(matches);
      }
      const status = inProgress === 'true';
      const filteredMatches = await this._matchService.searchStatus(status);
      return res.status(200).json(filteredMatches);
    } catch (error) {
      next(error);
    }
  }
}
