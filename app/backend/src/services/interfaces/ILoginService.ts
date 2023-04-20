import { IUserWithId } from './IUserService';

export interface ILogin {
  email: string
  password: string
}

export default interface ILoginService {
  login(email:string, password:string): Promise<string>
  getById(id:number): Promise<IUserWithId>
}
