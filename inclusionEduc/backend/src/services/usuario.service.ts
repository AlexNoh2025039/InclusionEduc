import { prisma } from '../lib/prisma.js';
import { CrearUsuarioDTO, ActualizarUsuarioDTO } from '../models/usuario.model.js';

export class UsuarioService {
    static async obtenerTodos() {
        return await prisma.usuario.findMany({
            select: {
                usuario_id: true,
                nombre: true,
                email: true,
                estado: true,
                creado_en: true,
                rol: true,
                escuela: true,
            },
        });
    }

    static async obtenerPorId(usuario_id: number) {
        return await prisma.usuario.findUnique({
            where: { usuario_id },
            include: {
                rol: true,
                escuela: true,
            },
        });
    }

    static async crear(datos: CrearUsuarioDTO) {
        return await prisma.usuario.create({
            data: datos,
        });
    }

    static async actualizar(usuario_id: number, datos: ActualizarUsuarioDTO) {
        return await prisma.usuario.update({
            where: { usuario_id },
            data: datos,
        });
    }

    static async eliminar(usuario_id: number) {
        return await prisma.usuario.delete({
            where: { usuario_id },
        });
    }
}