import { IUserWithId } from '../services/interfaces/IUserService';
import User from '../database/models/User';
import IUserRepository from './interface/IUserRepository';

export default class UserSequelizeRepository implements IUserRepository {
  constructor(private _userModel = User) {}

  async getByEmail(email:string): Promise<IUserWithId | null> {
    const user = await this._userModel.findOne({ where: { email } });
    return user;
  }

  async getById(id: number): Promise<IUserWithId | null> {
    const user = await this._userModel.findByPk(id);
    return user;
  }
}
