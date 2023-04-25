import { Request, Response, NextFunction } from 'express';

const verifyFields = (req:Request, res: Response, next: NextFunction): Response | void => {
  const { email, password } = req.body;
  if (!password || !email) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
};
export default verifyFields;
