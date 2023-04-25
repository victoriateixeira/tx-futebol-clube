import { ILogin } from '../services/interfaces/ILoginService';
import IUserValidation from './interfaces/IUserValidation';
import UnauthorizedError from '../errors/unauthorized-error';

export default class UserValidation implements IUserValidation {
  validateEmail = (email: string): void => {
    const emailValidation = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailValidation.test(email)) { throw new UnauthorizedError('Invalid email or password'); }
  };

  validatePassword = (password: string): void => {
    if (password.length < 6) { throw new UnauthorizedError('Invalid email or password'); }
  };

  validateLogin(user:ILogin): void {
    this.validateEmail(user.email);
    this.validatePassword(user.password);
  }
}
