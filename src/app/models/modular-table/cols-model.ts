export type ColsModel =
  | (BaseCol & { field: 'acciones'; actions: TableActions[] }) // si es acciones → requiere actions
  | DropdownCol // si es dropdown → requiere options
  | OtherCol; // cualquier otra combinación

interface BaseCol {
  field: string;
  header: string;
  hasFilter: boolean;
  displayType?: string;
  filterType?: string;
}

interface DropdownCol extends BaseCol {
  filterType: 'dropdown';
  options: DropDownOptions[];
  actions?: never;
}

interface OtherCol extends BaseCol {
  filterType?: Exclude<string, 'dropdown'>;
  options?: never;
  actions?: never;
}

interface DropDownOptions {
  label: string;
  value: string | null;
}

interface TableActions {
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
