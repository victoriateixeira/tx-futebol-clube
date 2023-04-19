import { Router } from 'express';
import TeamController from '../controllers/TeamController';
import TeamSequelizeRepository from '../repositories/TeamSequelizeRepository';
import TeamService from '../services/TeamService';

const teamRouter = Router();

const teamSequelizeRepository = new TeamSequelizeRepository();
const teamService = new TeamService(teamSequelizeRepository);
const teamController = new TeamController(teamService);
teamRouter.get('/', teamController.getAll.bind(teamController));
teamRouter.get('/:id', teamController.getById.bind(teamController));

export default teamRouter;
