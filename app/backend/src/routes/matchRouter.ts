import { Router } from 'express';

import TeamSequelizeRepository from '../repositories/TeamSequelizeRepository';
import validateToken from '../middlewares/validatesTokenMiddleware';
import MatchController from '../controllers/MatchController';
import MatchSequelizeRepository from '../repositories/MatchSequelizeRepository';
import MatchService from '../services/MatchService';

const matchRouter = Router();

const matchSequelizeRepository = new MatchSequelizeRepository();
const teamSequelizeRepository = new TeamSequelizeRepository();
const matchService = new MatchService(matchSequelizeRepository, teamSequelizeRepository);
const matchController = new MatchController(matchService);
matchRouter.get('/', matchController.searchStatus.bind(matchController));
matchRouter.patch('/:id/finish', validateToken, matchController.endMatch.bind(matchController));
matchRouter.patch('/:id', validateToken, matchController.updateMatch.bind(matchController));
matchRouter.post('/', validateToken, matchController.createMatch.bind(matchController));
// matchRouter.get('/:id', matchController.getById.bind(matchController));

export default matchRouter;
