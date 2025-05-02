export type ModeloColumnas =
  | (TablaBase & { field: 'acciones'; actions: AccionesTabla[] })
  | ColumnasDropdown
  | OtrasColumnas;

export type Severity = 'success' | 'info' | 'warning' | 'danger';

export type FilterType = 'numeric' | 'dropdown' | 'date' | 'text';

export type ActionName =
  | 'ver'
  | 'eliminar'
  | 'parametros'
  | 'download'
  | 'button';

export interface TablaBase {
  field: string;
  header: string;
  hasFilter: boolean;
  displayType?: string;
  filterType?: FilterType;
  // propiedadesTabla?: PropiedadesTabla | null;
}

export interface ColumnasDropdown extends TablaBase {
  filterType: 'dropdown';
  options: OpcionesDropdown[];
  actions?: never;
}

export interface OtrasColumnas extends TablaBase {
  filterType?: Exclude<FilterType, 'dropdown'>;
  options?: never;
  actions?: never;
}

export interface OpcionesDropdown {
  label: string;
  value: string | null;
}

export interface AccionesTabla {
  actionName: ActionName;
  icon?: string;
  text?: string;
  class?: string;
  severity?: string;
  clickHandler?: (data?) => void;
}

export interface ModeloDatosTabla {
  numero: number;
  creacion: Date; // mm/dd/yyyy
  calculo: Date;
  segmentacion: string;
  pensionados: number;
  disponibilidad: Date;
  estado: string;
  estadoTipo: string;
  usuarioCreacion: string;
  usuarioModificacion: string;
  modificacion: string;
  lote: string;
  tipoCiclo: string;
  ngClassField: { fields: NgClassFieldItem[] } | null;
}

export interface NgClassFieldItem {
  fieldName: string;
  stylesByValue: Record<string, Severity>;
}

export interface PropiedadesTabla {
  topButtons: Boton[] | [];
  tableTitle: string;
  rowSelectionButton?: Boton;
  hasCleanFilterButton?: boolean;
  hasDownloadButton?: boolean;
}

export interface Boton {
  title?: string;
  icon?: string;
  class?: string;
  type?: string;
  styles?: string[];
  clickHandler?: (data?) => void;
}
