export interface LoginDTO {
    email: string;
    password_hash: string;
}

export interface AuthResponseDTO {
    token: string;
    usuario: {
        usuario_id: number;
        nombre: string;
        email: string;
        rol_id: number;
        escuela_id?: number | null;
    };
}