export interface HistorialCicloPago {
  id: number;
  generacion: string;
  ejecucion: string;
  segmentacion: string;
  pensionados: number;
  acreditacion: string;
  disponibilidad: string;
  estado: string;
  usuarioCreacion: string;
  fechaCreacion: string;
  usuarioModificacion: string;
  fechaModificacion: string;
  descError: string;
  toggle?: boolean;
  codigrupociclo?: number;
  segmentacionTooltip?: string;
  tieneacreditaciones?: boolean;
}
