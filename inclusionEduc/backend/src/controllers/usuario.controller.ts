import { Request, Response, NextFunction } from 'express';
import { UsuarioService } from '../services/usuario.service.js';
import { PasswordUtil } from '../utils/password.util.js';
import { RequestAuth } from '../middlewares/auth.middleware.js';

export class UsuarioController {
    static async obtenerTodos(_req: Request, res: Response, next: NextFunction) {
        try {
            const usuarios = await UsuarioService.obtenerTodos();
            return res.json(usuarios);
        } catch (error) {
            next(error);
        }
    }

    static async obtenerPorId(req: Request, res: Response, next: NextFunction) {
        try {
            const usuario = await UsuarioService.obtenerPorId(Number(req.params.id));
            const { password_hash: _password_hash, ...usuarioSinPassword } = usuario ?? {};
            return res.json(usuarioSinPassword);
        } catch (error) {
            next(error);
        }
    }

    static async crear(req: Request, res: Response, next: NextFunction) {
        try {
            const { password, ...datos } = req.body;
            const password_hash = await PasswordUtil.hashPassword(password);
            const nuevoUsuario = await UsuarioService.crear({ ...datos, password_hash });
            const { password_hash: _password_hash, ...usuarioSinPassword } = nuevoUsuario;
            return res.status(201).json(usuarioSinPassword);
        } catch (error) {
            next(error);
        }
    }

    static async actualizar(req: Request, res: Response, next: NextFunction) {
        try {
            const { password, ...datos } = req.body;
            const datosValidos: Record<string, unknown> = { ...datos };
            if (password) {
                datosValidos.password_hash = await PasswordUtil.hashPassword(String(password));
            }
            const usuario = await UsuarioService.actualizar(Number(req.params.id), datosValidos as never);
            const { password_hash: _password_hash, ...usuarioSinPassword } = usuario;
            return res.json(usuarioSinPassword);
        } catch (error) {
            next(error);
        }
    }

    static async actualizarPropio(req: RequestAuth, res: Response, next: NextFunction) {
        try {
            const usuarioId = req.usuario?.usuario_id;
            if (!usuarioId) {
                return res.status(401).json({ message: 'Usuario no autenticado.' });
            }

            const { password, nombre, email } = req.body;
            const datos: Record<string, unknown> = {};
            if (nombre !== undefined) datos.nombre = nombre;
            if (email !== undefined) datos.email = email;
            if (password) {
                datos.password_hash = await PasswordUtil.hashPassword(String(password));
            }

            const usuarioActual = await UsuarioService.obtenerPorId(usuarioId);
            if (!usuarioActual) {
                return res.status(404).json({ message: 'Usuario no encontrado.' });
            }

            if (Object.keys(datos).length > 0) {
                const usuario = await UsuarioService.actualizar(usuarioId, datos as never);
                const { password_hash: _password_hash, ...usuarioSinPassword } = usuario;
                return res.json(usuarioSinPassword);
            }

            const { password_hash: _passwordHash, ...usuarioSinPassword } = usuarioActual;
            return res.json(usuarioSinPassword);
        } catch (error) {
            next(error);
        }
    }

    static async eliminar(req: Request, res: Response, next: NextFunction) {
        try {
            const usuario = await UsuarioService.eliminar(Number(req.params.id));
            return res.json(usuario);
        } catch (error) {
            next(error);
        }
    }
}