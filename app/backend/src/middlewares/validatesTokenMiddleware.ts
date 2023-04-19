import { Request, Response, NextFunction } from 'express';
import TokenService from '../utils/TokenService';
import UnauthorizedError from '../errors/unauthorized-error';

const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      throw new UnauthorizedError('Token not found');
    }
    new TokenService().verifyToken(authorization);
  } catch (error) {
    throw new UnauthorizedError('Token must be a valid token');
  }
  next();
};

export default validateToken;
