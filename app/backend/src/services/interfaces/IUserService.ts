export interface IUser {
  username: string
  role: string
  email: string
  password: string
}

export interface IUserWithId extends IUser {
  id: number
}

// export default interface IUserService {
//   getById(email: string):Promise<Omit<IUserWithId, 'password'>>
// }
