import { Request, Response, NextFunction } from 'express';

export const manejarErrores = (
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    console.error('Error no controlado:', err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor';

    res.status(statusCode).json({
        error: true,
        message,
    });
};