export interface Parametros {
  id?: string;
  nombre?: string;
  nombreAbreviado?: string;
  codigo?: string;
  procesosAsociados?: string[];
  estado?: string;
}

export interface ParametrosInfo {
  codigoParametro: string;
  fecha?: string;
  valor: string;
}

interface ParametrosData {
  parametros: ParametrosInfo[];
}

interface ParametrosBody {
  length: number;
  creadoPor: string;
  parametros: any;
  descripcion: string;
  desde: string;
  fechaActualizacion: string;
  fechaCreacion: string;
  hasta: string;
  id: string;
  monto: string
}

export interface ParametrosResponse {
  status: number;
  title: string;
  message: string;
  success: string;
  body: ParametrosBody;
  data: ParametrosData;
}
