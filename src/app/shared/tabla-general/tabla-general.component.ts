import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Table } from 'primeng/table';
import {
  AccionesTabla,
  Boton,
  ModeloColumnas,
  PropiedadesTabla
} from '@models/tabla-general/table-model';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import { ResBusquedaModelo } from '@shared/parametros-busqueda/parametros-busqueda.component';

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
  @Input() public propiedadesTabla: PropiedadesTabla = null;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['respuestaBusqueda'] && this.respuestaBusqueda) {
      this.resBusqueda();
    }
  }

  ngOnInit(): void {}

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
  }

  onGlobalFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.table.filterGlobal(value, 'contains');
  }

  getFilterTemplateType(col: any): 'dropdown' | 'date' | 'default' {
    if (!col.hasFilter) return 'default';
    if (col.filterType === 'dropdown') return 'dropdown';
    if (col.filterType === 'date') return 'date';
    return 'default';
  }

  public getColumnActions(col: ModeloColumnas): AccionesTabla[] {
    if (!col?.actions) {
      return [];
    }

    return col.actions.filter((action) =>
      this.isActionDefinedInColumn(col, action.actionName)
    );
  }

  private isActionDefinedInColumn(
    col: ModeloColumnas,
    actionName: string
  ): boolean {
    return col.actions.some((action) => action.actionName === actionName);
  }

  renderButton(col: ModeloColumnas) {
    return col.actions.filter(
      (col: AccionesTabla) => col.actionName === 'button'
    );
  }

  isDateField(field: string): boolean {
    return this.cols.some(
      (col) => col.field === field && col.filterType === 'date'
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
    const fieldValue = rowData[field];

    return (
      rowData?.ngClassField?.fields?.find((f: any) => f.fieldName === field)
        ?.stylesByValue?.[fieldValue] || null
    );
  }

  getTagStyle(styleClass: string | null) {
    switch (styleClass) {
      case 'success':
        return 'background-color: #E1F2D9; color: #2e7d32;';
      case 'warning':
        return 'background-color: #FFE5B5; color: #cc7a00;';
      case 'danger':
        return 'background-color: #FFD9E1; color: #c62828;';
      default:
        return 'text-white-800';
    }
  }

  rowClass(rowIndex: number) {
    return rowIndex % 2 === 0
      ? 'bg-white-200 text-black'
      : 'bg-gray-200 text-black';
  }
}
