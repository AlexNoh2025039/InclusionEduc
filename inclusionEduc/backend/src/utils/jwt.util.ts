import jwt, { SignOptions } from 'jsonwebtoken';
import { ENV } from '../config/env.js';

export interface TokenPayload {
    usuario_id: number;
    email: string;
    rol_id: number;
}

export class JwtUtil {
    static generarToken(payload: TokenPayload): string {
        return jwt.sign(payload, ENV.JWT_SECRET, {
            expiresIn: ENV.JWT_EXPIRES_IN as SignOptions['expiresIn'],
        });
    }

    static verificarToken(token: string): TokenPayload {
        return jwt.verify(token, ENV.JWT_SECRET) as TokenPayload;
    }
}