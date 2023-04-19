import { Request, Response, NextFunction } from 'express';
import ILoginService from '../services/interfaces/ILoginService';
import ILoginController from './interfaces/login-controller';

export default class LoginController implements ILoginController {
  private _loginService: ILoginService;

  constructor(loginService: ILoginService) {
    this._loginService = loginService;
  }

  async login(req: Request, res: Response, next: NextFunction): Promise <Response | void> {
    try {
      const { email, password } = req.body;
      const token = await this._loginService.login(email, password);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
