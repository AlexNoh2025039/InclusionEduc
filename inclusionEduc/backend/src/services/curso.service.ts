import { prisma } from '../lib/prisma.js';
import { CrearCursoDTO, InscripcionDTO, ActualizarProgresoDTO } from '../models/curso.model.js';

export class CursoService {
    static async obtenerTodos() {
        return await prisma.curso.findMany();
    }

    static async obtenerPorId(curso_id: number) {
        return await prisma.curso.findUnique({
            where: { curso_id },
        });
    }

    static async actualizar(curso_id: number, datos: Partial<CrearCursoDTO>) {
        return await prisma.curso.update({
            where: { curso_id },
            data: {
                ...datos,
                duracion_min: datos.duracion_min ? Number(datos.duracion_min) : undefined,
            },
        });
    }

    static async eliminar(curso_id: number) {
        return await prisma.curso.delete({
            where: { curso_id },
        });
    }

    static async crear(datos: CrearCursoDTO) {
        return await prisma.curso.create({
            data: {
                titulo: datos.titulo,
                descripcion: datos.descripcion,
                duracion_min: datos.duracion_min,
                nivel: datos.nivel,
                video_url: datos.video_url,
                pdf_data: datos.pdf_data,
                pdf_name: datos.pdf_name,
            },
        });
    }

    static async inscribir(datos: InscripcionDTO) {
        const where = {
            usuario_id_curso_id: {
                usuario_id: datos.usuario_id,
                curso_id: datos.curso_id,
            },
        };

        const inscription = await prisma.inscripcionCurso.findUnique({
            where,
        });

        if (inscription) {
            return inscription;
        }

        return await prisma.inscripcionCurso.create({
            data: datos,
        });
    }

    static async actualizarProgreso(inscripcion_id: number, datos: ActualizarProgresoDTO) {
        return await prisma.inscripcionCurso.update({
            where: { inscripcion_id },
            data: datos,
        });
    }

    static async obtenerInscripcionesUsuario(usuario_id: number) {
        return await prisma.inscripcionCurso.findMany({
            where: { usuario_id },
            include: {
                curso: true,
            },
        });
    }
}