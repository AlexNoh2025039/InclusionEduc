export interface CrearEscuelaDTO {
    nombre: string;
    codigo_distrito?: string;
    direccion?: string;
}

export interface ActualizarEscuelaDTO {
    nombre?: string;
    codigo_distrito?: string;
    direccion?: string;
}