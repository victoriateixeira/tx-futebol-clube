import { Router } from 'express';
import validateToken from '../middlewares/validatesTokenMiddleware';
import UserValidation from '../validations/UserValidations';
import LoginController from '../controllers/LoginController';
import verifyFields from '../middlewares/validateFieldsMiddleware';
import UserSequelizeRepository from '../repositories/UserSequelizeRepository';
import LoginService from '../services/LoginService';
import TokenService from '../utils/TokenService';

const loginRouter = Router();
const userRepository = new UserSequelizeRepository();
const tokenService = new TokenService();
const userValidations = new UserValidation();
const loginService = new LoginService(userRepository, tokenService, userValidations);
const loginController = new LoginController(loginService, tokenService);

loginRouter.post('/', verifyFields, loginController.login.bind(loginController));
loginRouter.get(
  '/role',
  validateToken,
  loginController.getRole.bind(loginController),
);

export default loginRouter;
