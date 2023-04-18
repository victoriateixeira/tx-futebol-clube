import { Router, Request, Response } from 'express';
import TeamSequelizeRepository from '../repositories/TeamSequelizeRepository';
import TeamService from '../services/TeamService';

const router = Router();

const teamSequelizeRepository = new TeamSequelizeRepository();
const teamService = new TeamService(teamSequelizeRepository);

router
  .get('/teams', (req: Request, res: Response) => res.status(200).json(''));
