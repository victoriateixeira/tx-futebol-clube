import { Request, Response, NextFunction } from 'express';
import MissingParamError from '../errors/missingParam-error';

const verifyFields = (req:Request, res: Response, next: NextFunction): Response | void => {
  const requiredFields = ['email', 'password'];
  for (let i = 0; i < requiredFields.length; i += 1) {
    if (!req.body[requiredFields[i]]) {
      throw new MissingParamError(`O campo ${requiredFields[i]} é obrigatório`);
    }
  }
  next();
};

export default verifyFields;
