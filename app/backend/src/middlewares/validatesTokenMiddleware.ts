import { Request, Response, NextFunction } from 'express';
import TokenService from '../utils/TokenService';
import UnauthorizedError from '../errors/unauthorized-error';

const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  try {
    const { authorization } = req.headers;
    console.log(authorization, 'AUTHORIZATION');
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const resp = new TokenService().verifyToken(authorization);
    console.log(resp, 'TOKENVERIFICATIOn');
  } catch (error) {
    throw new UnauthorizedError('Token must be a valid token');
  }
  next();
};

export default validateToken;
