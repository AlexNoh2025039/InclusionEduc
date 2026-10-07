export interface CrearCursoDTO {
    titulo: string;
    descripcion: string;
    duracion_min: number;
    nivel?: string;
    video_url?: string | null;
    pdf_data?: string | null;
    pdf_name?: string | null;
}

export interface InscripcionDTO {
    usuario_id: number;
    curso_id: number;
}

export interface ActualizarProgresoDTO {
    porcentaje_progreso: number;
    estado?: string;
}