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

  async endMatch(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { id } = req.params;
      const resp = await this._matchService.endMatch(+id);
      return res.status(200).json(resp);
    } catch (error) {
      next(error);
    }
  }

  async updateMatch(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const resp = await this._matchService.updateMatch(+id, +homeTeamGoals, +awayTeamGoals);
      return res.status(200).json(resp);
    } catch (error) {
      next(error);
    }
  }
}
