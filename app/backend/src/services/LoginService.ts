import NotFoundError from '../errors/notFound-error';
import IUserValidation from '../validations/interfaces/IUserValidation';
import ITokenService, { ITokenPayload } from '../utils/interfaces/ITokenService';
import UnauthorizedError from '../errors/unauthorized-error';
import IUserRepository from '../repositories/interface/IUserRepository';
import ILoginService from './interfaces/ILoginService';
import { IUserWithId } from './interfaces/IUserService';

export default class LoginService implements ILoginService {
  private _userRepository: IUserRepository;
  private _tokenService: ITokenService;
  private _userValidations: IUserValidation;
  constructor(
    userRepository: IUserRepository,
    tokenService: ITokenService,
    userValidations: IUserValidation,
  ) {
    this._userRepository = userRepository;
    this._tokenService = tokenService;
    this._userValidations = userValidations;
  }

  static verifyUserPassword(reqPassword:string, dbPassword:string) {
    return reqPassword === dbPassword;
  }

  async login(email: string, password:string): Promise<string> {
    this._userValidations.validateLogin({ email, password });
    const isUser = await this._userRepository.getByEmail(email);
    console.log(isUser, 'LOGINSERVICE');
    if (!isUser || !LoginService.verifyUserPassword(password, isUser.password)) {
      throw new UnauthorizedError('Invalid email or password');
    }
    const payload: ITokenPayload = { id: isUser.id, email: isUser.email };
    const token = this._tokenService.sign(payload);
    return token;
  }

  async getById(id: number): Promise<IUserWithId> {
    const user = await this._userRepository.getById(id);
    if (!user) throw new NotFoundError('O id informado não existe');
    return user;
  }
}
