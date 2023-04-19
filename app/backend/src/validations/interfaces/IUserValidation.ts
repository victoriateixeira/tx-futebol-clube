import { ILogin } from '../../services/interfaces/ILoginService';

export default interface IUserValidation {
  validateEmail(email:string): void
  validatePassword(password: string): void
  validateLogin(user: ILogin): void
}
