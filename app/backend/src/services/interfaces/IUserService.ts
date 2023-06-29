export interface IUser {
  username: string
  role: string
  email: string
  password: string
}

export interface IUserWithId extends IUser {
  id: number
}
