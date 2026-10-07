import { Request, Response, NextFunction } from 'express';
import { EscuelaService } from '../services/escuela.service.js';

export class EscuelaController {
    static async obtenerTodas(_req: Request, res: Response, next: NextFunction) {
        try {
            const escuelas = await EscuelaService.obtenerTodas();
            return res.json(escuelas);
        } catch (error) {
            next(error);
        }
    }

    static async obtenerPorId(req: Request, res: Response, next: NextFunction) {
        try {
            const escuela = await EscuelaService.obtenerPorId(Number(req.params.id));
            return res.json(escuela);
        } catch (error) {
            next(error);
        }
    }

    static async crear(req: Request, res: Response, next: NextFunction) {
        try {
            const escuela = await EscuelaService.crear(req.body);
            return res.status(201).json(escuela);
        } catch (error) {
            next(error);
        }
    }

    static async actualizar(req: Request, res: Response, next: NextFunction) {
        try {
            const escuela = await EscuelaService.actualizar(Number(req.params.id), req.body);
            return res.json(escuela);
        } catch (error) {
            next(error);
        }
    }

    static async eliminar(req: Request, res: Response, next: NextFunction) {
        try {
            const escuela = await EscuelaService.eliminar(Number(req.params.id));
            return res.json(escuela);
        } catch (error) {
            next(error);
        }
    }
}