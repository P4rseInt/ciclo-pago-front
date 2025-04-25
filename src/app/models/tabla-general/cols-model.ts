export type ModeloColumnas =
  | (TablaBase & { field: 'acciones'; actions: AccionesTabla[] }) // si es acciones → requiere actions
  | ColumnasDropdown // si es dropdown → requiere options
  | OtrasColumnas; // cualquier otra combinación

interface TablaBase {
  field: string;
  header: string;
  hasFilter: boolean;
  displayType?: string;
  filterType?: FilterType;
}

type FilterType = 'numeric' | 'dropdown' | 'date' | 'text';

interface ColumnasDropdown extends TablaBase {
  filterType: 'dropdown';
  options: OpcionesDropdown[];
  actions?: never;
}

interface OtrasColumnas extends TablaBase {
  filterType?: Exclude<FilterType, 'dropdown'>;
  options?: never;
  actions?: never;
}

interface OpcionesDropdown {
  label: string;
  value: string | null;
}

interface AccionesTabla {
  actionName: 'ver' | 'eliminar' | 'parametros' | 'download';
}

export interface ActionButton {
  label?: string;
  icon: string;
  actionName: string;
  clickHandler: () => void;
  class?: string;
  severity?: string;
}
