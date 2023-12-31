import { NextFunction, Request, Response } from 'express';
import ITeamService from '../services/interfaces/ITeamService';
import ITeamController from './interfaces/team-controller';

export default class TeamController implements ITeamController {
  private _teamService: ITeamService;

  constructor(teamService: ITeamService) {
    this._teamService = teamService;
  }

  async getAll(req: Request, res: Response): Promise<Response | void> {
    const teams = await this._teamService.getAll();
    return res.status(200).json(teams);
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise< Response | void> {
    try {
      const team = await this._teamService.getById(+req.params.id);
      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }
}
