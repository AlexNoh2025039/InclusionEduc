import { prisma } from '../lib/prisma.js';

export class AuthService {

    static async buscarPorEmail(email: string) {
        return await prisma.usuario.findUnique({
            where: { email },
            include: {
                rol: true,
                escuela: true,
            },
        });
    }

    static async crear(datos: {
        nombre: string;
        email: string;
        password_hash: string;
        rol_id: number;
        escuela_id?: number | null;
    }) {
        return await prisma.usuario.create({
            data: datos,
            include: {
                rol: true,
                escuela: true,
            },
        });
    }
}