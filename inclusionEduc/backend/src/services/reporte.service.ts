import { prisma } from '../lib/prisma.js';
import { CrearReporteDTO, ActualizarEstadoReporteDTO } from '../models/reporte.model.js';

export class ReporteService {
    static async obtenerTodos() {
        return await prisma.reporteIncidencia.findMany({
            include: {
                escuela: true,
                usuario: {
                    select: {
                        usuario_id: true,
                        nombre: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                creado_en: 'desc',
            },
        });
    }

    static async obtenerPorEscuela(escuela_id: number) {
        return await prisma.reporteIncidencia.findMany({
            where: { escuela_id },
            include: {
                usuario: {
                    select: {
                        usuario_id: true,
                        nombre: true,
                    },
                },
            },
            orderBy: {
                creado_en: 'desc',
            },
        });
    }

    static async crear(datos: CrearReporteDTO) {
        return await prisma.reporteIncidencia.create({
            data: datos,
        });
    }

    static async actualizar(reporte_id: number, datos: Partial<CrearReporteDTO>) {
        return await prisma.reporteIncidencia.update({
            where: { reporte_id },
            data: datos,
        });
    }

    static async cambiarEstado(reporte_id: number, datos: ActualizarEstadoReporteDTO) {
        return await prisma.reporteIncidencia.update({
            where: { reporte_id },
            data: datos,
        });
    }

    static async eliminar(reporte_id: number) {
        return await prisma.reporteIncidencia.delete({
            where: { reporte_id },
        });
    }
}