import { Request, Response, NextFunction } from 'express';
import { CursoService } from '../services/curso.service.js';
import { RequestAuth } from '../middlewares/auth.middleware.js';

export class CursoController {
    static async obtenerTodos(_req: Request, res: Response, next: NextFunction) {
        try {
            const cursos = await CursoService.obtenerTodos();
            return res.json(cursos);
        } catch (error) {
            next(error);
        }
    }

    static async crear(req: RequestAuth, res: Response, next: NextFunction) {
        try {
            const curso = await CursoService.crear({
                titulo: req.body.titulo,
                descripcion: req.body.descripcion,
                duracion_min: Number(req.body.duracion_min),
                nivel: req.body.nivel ?? 'Básico',
                video_url: req.body.video_url ?? null,
                pdf_data: req.body.pdf_data ?? null,
                pdf_name: req.body.pdf_name ?? null,
            });
            return res.status(201).json(curso);
        } catch (error) {
            next(error);
        }
    }

    static async inscribir(req: RequestAuth, res: Response, next: NextFunction) {
        try {
            const { curso_id } = req.body;
            const usuario_id = Number(req.usuario?.usuario_id);
            const inscripcion = await CursoService.inscribir({ usuario_id, curso_id });
            return res.status(201).json(inscripcion);
        } catch (error) {
            next(error);
        }
    }

    static async obtenerMisCursos(req: RequestAuth, res: Response, next: NextFunction) {
        try {
            const usuario_id = Number(req.usuario?.usuario_id);
            const cursos = await CursoService.obtenerInscripcionesUsuario(usuario_id);
            return res.json(cursos);
        } catch (error) {
            next(error);
        }
    }

    static async actualizar(req: RequestAuth, res: Response, next: NextFunction) {
        try {
            const curso = await CursoService.actualizar(Number(req.params.id), req.body);
            return res.json(curso);
        } catch (error) {
            next(error);
        }
    }

    static async eliminar(req: RequestAuth, res: Response, next: NextFunction) {
        try {
            const curso = await CursoService.eliminar(Number(req.params.id));
            return res.json(curso);
        } catch (error) {
            next(error);
        }
    }

    static async actualizarProgreso(req: Request, res: Response, next: NextFunction) {
        try {
            const inscripcion = await CursoService.actualizarProgreso(
                Number(req.params.id),
                req.body,
            );
            return res.json(inscripcion);
        } catch (error) {
            next(error);
        }
    }
}