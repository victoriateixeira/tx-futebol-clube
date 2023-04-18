import { Router } from 'express';
import TeamController from '../controllers/teamController';
import TeamSequelizeRepository from '../repositories/TeamSequelizeRepository';
import TeamService from '../services/TeamService';

const router = Router();

const teamSequelizeRepository = new TeamSequelizeRepository();
const teamService = new TeamService(teamSequelizeRepository);
const teamController = new TeamController(teamService);
router
  .get('/teams', teamController.getAll.bind(teamController));
