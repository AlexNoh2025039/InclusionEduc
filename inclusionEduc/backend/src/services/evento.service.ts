import { prisma } from '../lib/prisma.js';
import { CrearEventoDTO } from '../models/evento.model.js';

export class EventoService {
    static async obtenerTodos() {
        return await prisma.eventoTaller.findMany({
            include: {
                escuela: true,
                creador: {
                    select: {
                        usuario_id: true,
                        nombre: true,
                    },
                },
            },
        });
    }

    static async crear(datos: CrearEventoDTO) {
        return await prisma.eventoTaller.create({
            data: {
                ...datos,
                fecha_evento: new Date(datos.fecha_evento),
            },
        });
    }

    static async actualizar(evento_id: number, datos: Partial<CrearEventoDTO>) {
        return await prisma.eventoTaller.update({
            where: { evento_id },
            data: {
                ...datos,
                fecha_evento: datos.fecha_evento ? new Date(datos.fecha_evento) : undefined,
            },
        });
    }

    static async eliminar(evento_id: number) {
        return await prisma.eventoTaller.delete({
            where: { evento_id },
        });
    }
}