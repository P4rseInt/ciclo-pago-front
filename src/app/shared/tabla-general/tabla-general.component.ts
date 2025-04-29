import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Table } from 'primeng/table';
import { ActionButton, ModeloColumnas } from '@models/tabla-general/cols-model';
import { PrimeIcons, PrimeNGConfig } from 'primeng/api';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import { ResBusquedaModelo } from '@shared/parametros-busqueda/parametros-busqueda.component';
import { Boton } from '@models/tabla-general/boton-model';

@Component({
  selector: 'app-tabla-general',
  templateUrl: './tabla-general.component.html',
  styleUrls: ['./tabla-general.component.scss']
})
export class TablaGeneralComponent implements OnInit, OnChanges {
  @ViewChild('dtTable') table!: Table;

  @Input() public tableData: any[];
  @Input() public cols: ModeloColumnas[];
  @Input() public respuestaBusqueda: ResBusquedaModelo = null;
  @Input() public boton: Boton = null;
  @Input() public tableTitle = '';

  @Output() verOutput: EventEmitter<any> = new EventEmitter();
  @Output() eliminarOutput: EventEmitter<any> = new EventEmitter();
  @Output() clearSearch: EventEmitter<boolean> = new EventEmitter();
  @Output() openParametrosPage: EventEmitter<any> = new EventEmitter();

  dateFormControl = new FormControl(null);
  dropdownsControl = new FormControl(null);
  searchControl = new FormControl(null);

  constructor(private readonly primengConfig: PrimeNGConfig) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['respuestaBusqueda'] && this.respuestaBusqueda) {
      this.resBusqueda();
    }
  }

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
    console.log('tableData.length', this.tableData.length);
  }

  resBusqueda() {
    const criterios = this.respuestaBusqueda;
    this.table.filterGlobal('', 'contains');

    Object.keys(criterios).forEach((key) => {
      const valor = criterios[key];
      console.log('valor', valor);
      if (valor != null && valor !== '') {
        this.table.filter(valor, key, 'contains');
      }
    });
  }

  filterUniqueCols(
    rawCols: ModeloColumnas[],
    keepLast = false
  ): ModeloColumnas[] {
    const seen = new Set<string>();
    const result: ModeloColumnas[] = [];

    const source = keepLast ? [...rawCols].reverse() : rawCols;

    for (const col of source) {
      if (!seen.has(col.field)) {
        if (keepLast) {
          result.unshift(col);
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

  public getColumns(): ModeloColumnas[] {
    return this.filterUniqueCols(this.cols);
  }

  public getTableData() {
    return this.tableData;
  }

  public getGlobalFilterFields(): string[] {
    return this.getColumns().map((col) => col.field);
  }

  clearFilters(dtTable: Table) {
    dtTable.clear();
    this.searchControl.setValue('');
    this.clearSearch.emit(true);
  }

  onGlobalFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.table.filterGlobal(value, 'contains');
  }

  getNgClass(field: string): string {
    console.log('field', field);
    switch (field) {
      case 'info':
        return 'bg-yellow-100 text-yellow-800';
      case 'danger':
        return 'bg-red-100 text-red-800';
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'Previo':
        return 'bg-yellow-100 text-yellow-800';
      case 'Definitivo':
        return 'bg-green-100 text-green-800';
      case 'En proceso':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  ver(element: any) {
    this.verOutput.emit(element);
  }

  handleDelete(element: any) {
    console.log(element);
    this.eliminarOutput.emit(element);
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
      },
      {
        icon: '',
        actionName: 'button',
        clickHandler: () => this.verLog(rowData)
      }
    ].filter((action) => this.shouldShowAction(col, action.actionName));
  }

  shouldShowAction(col: any, actionName: string): boolean {
    return col?.actions?.some((a: any) => a.actionName === actionName);
  }

  renderButton(col: any) {
    console.log(
      'button',
      col.actions.filter((col) => col.actionName === 'button')
    );
    return col.actions.filter((col) => col.actionName === 'button');
  }

  public openParametros(rowData) {
    this.openParametrosPage.emit(rowData);
  }

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
    if (this.isDateField(field) && value) {
      return new Date(value).toLocaleDateString('es-CL');
    }
    return value;
  }

  getNgClassStyle(rowData: any, field: string): string | null {
    if (!rowData?.ngClassField?.fields) {
      return null;
    }

    const match = rowData.ngClassField.fields.find(
      (f: any) => f.fieldName === field
    );

    if (!match || !match.stylesByValue) {
      return null;
    }

    const fieldValue = rowData[field];
    return match.stylesByValue[fieldValue] || null;
  }

  protected readonly PrimeIcons = PrimeIcons;

  public verLog(rowData: any) {
    console.log(rowData);
  }
}
