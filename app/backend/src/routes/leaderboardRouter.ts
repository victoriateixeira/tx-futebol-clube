import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import LeaderboardRepository from '../repositories/LeaderboardSequelizeRepository';
import LeaderboardService from '../services/LeaderboardService';

const leaderboardRouter = Router();

const leaderboardRepository = new LeaderboardRepository();
const leaderboardService = new LeaderboardService(leaderboardRepository);
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRouter.get('/', leaderboardController.leaderboardHome.bind(leaderboardController));

export default leaderboardRouter;
