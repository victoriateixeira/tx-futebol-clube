import * as jwt from 'jsonwebtoken';
import ITokenService, { ITokenPayload } from './interfaces/ITokenService';

export default class JwtTokenService implements ITokenService {
  private _secret: jwt.Secret;
  private _options: jwt.SignOptions;

  constructor(private _jwt = jwt) {
    this._secret = process.env.JWT_SECRET || 'secretFiller';
    this._options = {
      algorithm: 'HS256',
      expiresIn: '30d',
    };
  }

  sign(payload: ITokenPayload): string {
    return this._jwt.sign(payload, this._secret, this._options);
  }
}
