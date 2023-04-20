import { IUserWithId } from '../../services/interfaces/IUserService';

export default interface IUserRepository {
  getByEmail(email:string): Promise<IUserWithId | null>
  getById(id:number):Promise<IUserWithId | null>
}
