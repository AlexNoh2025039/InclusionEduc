import { Request, Response, NextFunction } from 'express';
import { JwtUtil, TokenPayload } from '../utils/jwt.util.js';

export interface RequestAuth extends Request {
    usuario?: TokenPayload;
}

export const verificarTokenMiddleware = (
    req: RequestAuth,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Acceso no autorizado. Se requiere un token de autenticación.',
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = JwtUtil.verificarToken(token);
        req.usuario = payload;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Token inválido o expirado.',
        });
    }
};