import { Request, Response, NextFunction } from 'express';
import { RequestAuth } from './auth.middleware.js';

const rolesPermitidos = new Set([1, 2]);

export const permitirRoles = (roles: number[]) => {
    const permitidos = new Set(roles);

    return (req: RequestAuth, res: Response, next: NextFunction) => {
        const rolId = req.usuario?.rol_id;

        if (!rolId || !permitidos.has(rolId)) {
            return res.status(403).json({
                message: 'No tienes permiso para realizar esta acción.',
            });
        }

        next();
    };
};

export const permitirRolesDeCurso = (req: RequestAuth, res: Response, next: NextFunction) => {
    if (!req.usuario || !rolesPermitidos.has(req.usuario.rol_id)) {
        return res.status(403).json({
            message: 'Solo administración u orientación pueden crear cursos.',
        });
    }

    next();
};
