export interface CrearReporteDTO {
    escuela_id: number;
    tipo_acoso: string;
    descripcion: string;
    nivel_prioridad?: string;
    es_anonimo?: boolean;
    usuario_id?: number;
}

export interface ActualizarEstadoReporteDTO {
    estado: string;
    nivel_prioridad?: string;
}   