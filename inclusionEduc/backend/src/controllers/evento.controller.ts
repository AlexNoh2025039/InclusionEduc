import { Request, Response, NextFunction } from 'express';
import { EventoService } from '../services/evento.service.js';

export class EventoController {
    static async obtenerTodos(_req: Request, res: Response, next: NextFunction) {
        try {
            const eventos = await EventoService.obtenerTodos();
            return res.json(eventos);
        } catch (error) {
            next(error);
        }
    }

    static async crear(req: Request, res: Response, next: NextFunction) {
        try {
            const evento = await EventoService.crear({
                ...req.body,
                fecha_evento: new Date(req.body.fecha_evento),
            });
            return res.status(201).json(evento);
        } catch (error) {
            next(error);
        }
    }

    static async actualizar(req: Request, res: Response, next: NextFunction) {
        try {
            const evento = await EventoService.actualizar(Number(req.params.id), req.body);
            return res.json(evento);
        } catch (error) {
            next(error);
        }
    }

    static async eliminar(req: Request, res: Response, next: NextFunction) {
        try {
            const evento = await EventoService.eliminar(Number(req.params.id));
            return res.json(evento);
        } catch (error) {
            next(error);
        }
    }
}