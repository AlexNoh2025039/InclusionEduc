export interface CrearEventoDTO {
  escuela_id: number;
  creador_id: number;
  titulo: string;
  fecha_evento: Date | string;
  lugar: string;
}
