import { Request, Response, NextFunction } from 'express';
import IMatchController from './interfaces/match-controller';
import IMatchService from '../services/interfaces/IMatchService';

export default class MatchController implements IMatchController {
  private _matchService: IMatchService;

  constructor(matchService: IMatchService) {
    this._matchService = matchService;
  }

  async getAll(_req: Request, res: Response, _next: NextFunction): Promise<Response | void> {
    const matches = await this._matchService.getAll();
    return res.status(200).json(matches);
  }
}
