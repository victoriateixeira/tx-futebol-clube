import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import verifyFields from '../middlewares/validateFieldsMiddleware';
import UserSequelizeRepository from '../repositories/UserSequelizeRepository';
import LoginService from '../services/LoginService';
import TokenService from '../utils/TokenService';

const loginRouter = Router();
const userRepository = new UserSequelizeRepository();
const tokenService = new TokenService();
const loginService = new LoginService(userRepository, tokenService);
const loginController = new LoginController(loginService);

loginRouter.post('/', verifyFields, loginController.login.bind(loginController));

export default loginRouter;
