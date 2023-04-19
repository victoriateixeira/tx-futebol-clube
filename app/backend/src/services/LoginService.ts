import UnauthorizedError from '../errors/unauthorized-error';
import IUserRepository from '../repositories/interface/IUserRepository';
import ILoginService from './interfaces/ILoginService';

export default class LoginService implements ILoginService {
  private _userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }

  static verifyUserPassword(reqPassword:string, dbPassword:string) {
    return reqPassword === dbPassword;
  }

  async login(email: string, password:string): Promise<string> {
    const isUser = await this._userRepository.getByEmail(email);
    if (!isUser || !LoginService.verifyUserPassword(password, isUser.password)) {
      throw new UnauthorizedError('email e/ou senha inválidos');
    }
    return 'token';
  }
}
