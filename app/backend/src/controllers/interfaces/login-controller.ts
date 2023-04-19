import { Request, Response, NextFunction } from 'express';

export default interface ILoginController {
  login(rereq: Request, res: Response, next: NextFunction): Promise<Response | void>
}
