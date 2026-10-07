import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service.js';
import { PasswordUtil } from '../utils/password.util.js';
import { JwtUtil } from '../utils/jwt.util.js';

export class AuthController {
    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const usuario = await AuthService.buscarPorEmail(email);

            if (!usuario) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }

            const esValida = await PasswordUtil.comparePassword(password, usuario.password_hash);
            if (!esValida) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }

            const token = JwtUtil.generarToken({
                usuario_id: usuario.usuario_id,
                email: usuario.email,
                rol_id: usuario.rol_id,
            });

            return res.json({
                token,
                usuario: {
                    usuario_id: usuario.usuario_id,
                    nombre: usuario.nombre,
                    email: usuario.email,
                    rol_id: usuario.rol_id,
                    rol: usuario.rol,
                    escuela: usuario.escuela,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { nombre, email, password, rol_id = 3, escuela_id } = req.body;
            const password_hash = await PasswordUtil.hashPassword(password);

            const usuario = await AuthService.crear({
                nombre,
                email,
                password_hash,
                rol_id,
                escuela_id,
            });

            const { password_hash: _password_hash, ...usuarioSinPassword } = usuario;

            return res.status(201).json({
                message: 'Usuario creado correctamente',
                usuario: usuarioSinPassword,
            });
        } catch (error) {
            next(error);
        }
    }
}