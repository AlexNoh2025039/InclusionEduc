export interface CrearUsuarioDTO {
    nombre: string;
    email: string;
    password_hash: string;
    rol_id: number;
    escuela_id?: number;
}

export interface ActualizarUsuarioDTO {
    nombre?: string;
    email?: string;
    password_hash?: string;
    rol_id?: number;
    escuela_id?: number;
    estado?: string;
}   