export interface Financiamientos {
  tipo: string;
  valor_uf: number;
  valor_pesos: number;
}

export interface UniversoPago {
  id: number;
  rut: string;
  nombre: string;
  montoPension?: number;
  tipoPago: string;
  tipoBeneficio: string;
  modalidad: string;
  fechaInicio: string;
  fechaTermino: string;
  fechaUltimoPago: string;
  // fechaRecepcion: string;
  // fechaAprobacion: string;
  // fechaDisponibilidad: string;
  // financiamientos: Financiamientos[];
  estado: string;
  toggle?: boolean;
}
