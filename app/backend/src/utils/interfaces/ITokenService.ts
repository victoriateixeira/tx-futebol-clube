import * as jwt from 'jsonwebtoken';

export interface ITokenPayload {
  id: number
  email: string
}

export default interface ITokenService {
  sign(payload: ITokenPayload): string
  verifyToken(authorization: string): string | jwt.JwtPayload
}
