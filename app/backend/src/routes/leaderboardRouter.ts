import { Router } from 'express';
import TeamSequelizeRepository from '../repositories/TeamSequelizeRepository';
import LeaderboardController from '../controllers/LeaderboardController';
import LeaderboardRepository from '../repositories/LeaderboardSequelizeRepository';
import LeaderboardService from '../services/LeaderboardService';
import MatchSequelizeRepository from '../repositories/MatchSequelizeRepository';

const leaderboardRouter = Router();

const leaderboardRepository = new LeaderboardRepository();
const teamRepository = new TeamSequelizeRepository();
const matchesRepository = new MatchSequelizeRepository();
const leaderboardService = new LeaderboardService(
  leaderboardRepository,
  matchesRepository,
  teamRepository,
);
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRouter.get('/', leaderboardController.leaderboardHome.bind(leaderboardController));

export default leaderboardRouter;
