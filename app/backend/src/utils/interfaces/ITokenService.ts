export interface ITokenPayload {
  id: number
  email: string
}

export default interface ITokenService {
  sign(payload: ITokenPayload): string
}
