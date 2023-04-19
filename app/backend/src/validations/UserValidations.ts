import { ILogin } from '../services/interfaces/ILoginService';
import InvalidParamError from '../errors/invalidParam-error';
import IUserValidation from './interfaces/IUserValidation';

export default class UserValidation implements IUserValidation {
  validateEmail = (email: string): void => {
    const emailValidation = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailValidation.test(email)) { throw new InvalidParamError('Invalid email or password'); }
  };

  validatePassword = (password: string): void => {
    if (password.length < 6) { throw new InvalidParamError('Invalid email or password'); }
  };

  validateLogin = (user:ILogin): void => {
    this.validateEmail(user.email);
    this.validatePassword(user.password);
  };
}
