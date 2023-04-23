import { Request, Response, NextFunction } from 'express';

const verifyFields = (req:Request, res: Response, next: NextFunction): Response | void => {
  const requiredFields = ['email', 'password'];
  for (let i = 0; i < requiredFields.length; i += 1) {
    if (!req.body[requiredFields[i]]) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
  }
  next();
};

export default verifyFields;
