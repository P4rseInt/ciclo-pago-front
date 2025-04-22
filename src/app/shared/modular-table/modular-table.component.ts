import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Table } from 'primeng/table';
import { ActionButton, ColsModel } from '@models/modular-table/cols-model';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-modular-table',
  templateUrl: './modular-table.component.html',
  styleUrls: ['./modular-table.component.scss']
})
export class ModularTableComponent implements OnInit {
  @ViewChild('dtTable') table!: Table;
  @Input() public tableData: any[];
  @Input() public cols: ColsModel[];

  @Output() verOutput: EventEmitter<any> = new EventEmitter();
  @Output() eliminarOutput: EventEmitter<any> = new EventEmitter();

  dateFormControl = new FormControl(null);
  dropdownsControl = new FormControl(null);
  searchControl = new FormControl(null);

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.setTranslation({
      dayNames: [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado'
      ],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre'
      ],
      monthNamesShort: [
        'ene',
        'feb',
        'mar',
        'abr',
        'may',
        'jun',
        'jul',
        'ago',
        'sep',
        'oct',
        'nov',
        'dic'
      ],
      today: 'Hoy',
      clear: 'Limpiar',
      apply: 'Aplicar',
      dateFormat: 'dd/mm/yy', // <-- ESTE CAMBIA EL FORMATO DE FECHA
      firstDayOfWeek: 1,
      addRule: 'Aplicar Regla',
      removeRule: 'Eliminar Regla',
      matchAll: 'Coincidir Todos',
      matchAny: 'Coincidir con cualquier',
      startsWith: 'Empieza con',
      contains: 'Contiene',
      notContains: 'No contiene',
      endsWith: 'Termina con',
      equals: 'Igual a',
      notEquals: 'Distinto a',
      lt: 'Menor que',
      lte: 'Menor o igual que',
      gt: 'Mayor que',
      gte: 'Mayor o igual que'
    });
  }

  getColumns(): ColsModel[] {
    return this.cols;
  }

  clear(dtTable: Table) {
    dtTable.clear();
    this.searchControl.setValue('');
  }

  onGlobalFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.table.filterGlobal(value, 'contains');
  }

  getEstadoClass(tipo: string): string {
    switch (tipo) {
      case 'info':
        return 'bg-blue-100 text-blue-800';
      case 'danger':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  ver(element) {
    this.verOutput.emit(element);
  }

  handleDelete(element) {
    console.log(element);
    this.eliminarOutput.emit(element);
  }

  shouldShowAction(col: any, actionName: string): boolean {
    return col?.actions?.some((a: any) => a.actionName === actionName);
  }

  getFilterTemplateType(col: any): 'dropdown' | 'date' | 'default' {
    if (!col.hasFilter) return 'default';
    if (col.filterType === 'dropdown') return 'dropdown';
    if (col.filterType === 'date') return 'date';
    return 'default';
  }

  getColumnActions(col: any, rowData: any): ActionButton[] {
    return [
      {
        icon: 'pi pi-cog',
        actionName: 'Parametros',
        clickHandler: () => this.openParametros(rowData)
      },
      {
        icon: 'pi pi-eye',
        actionName: 'Ver',
        clickHandler: () => this.ver(rowData)
      },
      {
        icon: 'pi pi-trash',
        actionName: 'Eliminar',
        clickHandler: () => this.handleDelete(rowData)
      }
    ].filter((action) => this.shouldShowAction(col, action.actionName));
  }

  private openParametros(element: any) {}

  isDateField(field: string): boolean {
    return this.cols.some(
      (col) => col.field === field && col.filterType === 'date'
    );
  }
}
