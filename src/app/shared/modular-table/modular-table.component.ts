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
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

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

  constructor(private readonly primengConfig: PrimeNGConfig) {}

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

  filterUniqueCols(rawCols: ColsModel[], keepLast = false): ColsModel[] {
    const seen = new Set<string>();
    const result: ColsModel[] = [];

    const source = keepLast ? [...rawCols].reverse() : rawCols;

    for (const col of source) {
      if (!seen.has(col.field)) {
        if (keepLast) {
          result.unshift(col); // mantener orden original si se invierte
        } else {
          result.push(col);
        }
        seen.add(col.field);
      } else {
        console.warn(`Columna duplicada ignorada: "${col.field}"`);
      }
    }

    return result;
  }

  public getColumns(): ColsModel[] {
    return this.filterUniqueCols(this.cols);
  }

  public getGlobalFilterFields(): string[] {
    return this.getColumns().map((col) => col.field);
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
        actionName: 'parametros',
        clickHandler: () => this.openParametros(rowData)
      },
      {
        icon: 'pi pi-eye',
        actionName: 'ver',
        clickHandler: () => this.ver(rowData)
      },
      {
        icon: 'pi pi-trash',
        actionName: 'eliminar',
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

  public shouldRenderDownloadButton(): boolean {
    const accionesCol = this.cols.find((col) => col.field === 'acciones');
    return (
      accionesCol?.actions?.some(
        (action) => action?.actionName === 'download'
      ) ?? false
    );
  }

  exportTableToExcel(): void {
    const exportData = this.tableData.map((row) => {
      const exportRow: any = {};
      this.getColumns().forEach((col) => {
        if (col.field && col.field !== 'acciones') {
          exportRow[col.header] = this.formatExcelValue(
            row[col.field],
            col.field
          );
        }
      });
      return exportRow;
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    const workbook: XLSX.WorkBook = {
      Sheets: { Datos: worksheet },
      SheetNames: ['Datos']
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    const blob: Blob = new Blob([excelBuffer], {
      type: 'application/octet-stream'
    });
    FileSaver.saveAs(blob, 'ciclos-pago.xlsx');
  }

  private formatExcelValue(value: any, field: string): any {
    // Puedes extender esto si necesitas formatear otras cosas (números, texto, etc.)
    if (this.isDateField(field) && value) {
      return new Date(value).toLocaleDateString('es-CL');
    }
    return value;
  }
}
