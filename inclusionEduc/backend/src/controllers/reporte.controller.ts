import { Request, Response, NextFunction } from 'express';
import { ReporteService } from '../services/reporte.service.js';

export class ReporteController {
    static async obtenerTodos(_req: Request, res: Response, next: NextFunction) {
        try {
            const reportes = await ReporteService.obtenerTodos();
            return res.json(reportes);
        } catch (error) {
            next(error);
        }
    }

    static async crear(req: Request, res: Response, next: NextFunction) {
        try {
            const reporte = await ReporteService.crear({
                ...req.body,
                es_anonimo: req.body.es_anonimo ?? true,
                estado: 'Pendiente',
                nivel_prioridad: req.body.nivel_prioridad ?? 'Media',
            });
            return res.status(201).json(reporte);
        } catch (error) {
            next(error);
        }
    }

    static async actualizar(req: Request, res: Response, next: NextFunction) {
        try {
            const reporte = await ReporteService.actualizar(Number(req.params.id), req.body);
            return res.json(reporte);
        } catch (error) {
            next(error);
        }
    }

    static async actualizarEstado(req: Request, res: Response, next: NextFunction) {
        try {
            const reporte = await ReporteService.cambiarEstado(Number(req.params.id), {
                estado: req.body.estado,
                nivel_prioridad: req.body.nivel_prioridad,
            });
            return res.json(reporte);
        } catch (error) {
            next(error);
        }
    }

    static async eliminar(req: Request, res: Response, next: NextFunction) {
        try {
            const reporte = await ReporteService.eliminar(Number(req.params.id));
            return res.json(reporte);
        } catch (error) {
            next(error);
        }
    }
}