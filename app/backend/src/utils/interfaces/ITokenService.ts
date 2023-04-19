export interface ITokenPayload {
  id: number
  username: string
}

export default interface ITokenService {
  sign(payload: ITokenPayload): string
}
