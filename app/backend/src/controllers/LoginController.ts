import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import ITokenService from '../utils/interfaces/ITokenService';
import ILoginService from '../services/interfaces/ILoginService';
import ILoginController from './interfaces/login-controller';

export default class LoginController implements ILoginController {
  private _loginService: ILoginService;
  private _tokenService: ITokenService;
  constructor(loginService: ILoginService, tokenService: ITokenService) {
    this._loginService = loginService;
    this._tokenService = tokenService;
  }

  async login(req: Request, res: Response, next: NextFunction): Promise <Response | void> {
    try {
      const { email, password } = req.body;
      const token = await this._loginService.login(email, password);
      return res.status(200).json({ token });
    } catch (error) {
      return next(error);
    }
  }

  async getRole(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { authorization } = req.headers;
      if (!authorization) return;
      const { data: { id } } = this._tokenService.verifyToken(authorization) as JwtPayload;
      const user = await this._loginService.getById(id);
      const { role } = user;
      return res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  }
}
