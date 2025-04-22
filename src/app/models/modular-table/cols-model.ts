export interface ColsModel {
  field: string;
  header: string;
  hasFilter?: boolean;
  filterType?: string;
  displayType?: string;
  options?: DropDownOptions[];
  actions?: TableActions[];
}

export interface DropDownOptions {
  label: string;
  value: string;
}

export interface TableActions {
  actionName: string;
}
