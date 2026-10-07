import { prisma } from '../lib/prisma.js';
import { CrearEscuelaDTO, ActualizarEscuelaDTO } from '../models/escuela.model.js';

export class EscuelaService {
    static async obtenerTodas() {
        return await prisma.escuela.findMany({
            include: {
                _count: {
                    select: {
                        usuarios: true,
                        reportes: true,
                    },
                },
            },
        });
    }

    static async obtenerPorId(escuela_id: number) {
        return await prisma.escuela.findUnique({
            where: { escuela_id },
            include: {
                usuarios: true,
                reportes: true,
                eventos: true,
            },
        });
    }

    static async crear(datos: CrearEscuelaDTO) {
        return await prisma.escuela.create({
            data: datos,
        });
    }

    static async actualizar(escuela_id: number, datos: ActualizarEscuelaDTO) {
        return await prisma.escuela.update({
            where: { escuela_id },
            data: datos,
        });
    }

    static async eliminar(escuela_id: number) {
        return await prisma.escuela.delete({
            where: { escuela_id },
        });
    }
}