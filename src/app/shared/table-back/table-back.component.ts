import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent
} from '@angular/material/paginator';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Table } from 'primeng/table';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-table-back',
  templateUrl: './table-back.component.html',
  styleUrls: ['./table-back.component.scss']
})
export class TableBackComponent implements OnInit {
  @ViewChild('dtTable') table!: Table;

  @Input() title = '';
  @Input() tableInfo: any[] = [];
  @Input() segmentacionTipos = 'bla';
  @Input() dataSource: Array<any> = [];
  @Input() headerButton: any = null;
  @Input() totalRegisters = 0;
  @Input() pageSize = 0;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatMenuTrigger) filterMenuTrigger!: MatMenuTrigger;

  @ViewChild('menu') menuTrigger!: MatMenuTrigger;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  @Output() paginatorOutput = new EventEmitter<MatPaginator>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() filtrarDatos = new EventEmitter<any[]>();

  private _paginator: MatPaginator | null;

  @ViewChild(MatPaginator)
  set matPaginator(mp: MatPaginator) {
    if (mp !== this._paginator) {
      this._paginator = mp;
      if (mp) {
        this.paginatorOutput.emit(mp);
      }
    }
  }

  actionColumn = [
    {
      icon: 'visibility',
      tooltip: 'Ver detalle',
      action: (row: any) => this.verDetalle(row),
      class: 'icon',
      disabledId: 'bloqueado', // si quieres desactivar basado en alguna propiedad'
      name: 'Ver detalle'
    },
    {
      icon: 'edit',
      tooltip: 'Editar registro',
      action: (row: any) => this.editar(row),
      class: 'icon',
      name: 'Editar'
    },
    {
      icon: 'delete',
      tooltip: 'Eliminar',
      action: (row: any) => this.eliminar(row),
      class: 'icon',
      extraClass: 'danger-icon',
      name: 'Eliminar'
    }
    // {
    //   icon: 'more_vert',
    //   class: 'menu',
    //   menuItems: [
    //     {
    //       icon: 'download',
    //       value: 'Descargar PDF',
    //       doSome: (row: any) => this.descargarPDF(row)
    //     },
    //     {
    //       icon: 'file_copy',
    //       value: 'Duplicar',
    //       doSome: (row: any) => this.duplicar(row),
    //       disabled: false
    //     }
    //   ]
    // }
  ];

  originalData: any[] = [];
  showDeleteFilters = false;
  enableFilter = false;
  showFilterBar = false;
  displayedColumns: string[] = [];
  datosObtenidos: any;
  activeFilter: string | null = null;
  resumen: any = null;
  filters: any = {};
  displayFilter = false;
  activeFilterRow: any;
  activeFilterHeader: any;
  stylesFilter: any = {};

  selectedOptions: { [columnName: string]: string[] } = {};
  activeButton: string | null = null;

  filtersArray: any[] = [];
  filterValue: any = '';
  filterArrayValues: any[] = [];
  filtersDateValues: any = {
    desde: '',
    hasta: ''
  };
  hasToggle = true;
  hasActions = true;

  constructor(
    private paginatorIntl: MatPaginatorIntl,
    private elementRef: ElementRef
  ) {
    this._paginator = null;
    this.paginatorIntl.getRangeLabel = (
      page: number,
      pageSize: number,
      length: number
    ) =>
      `${length === 0 || pageSize === 0 ? 0 : page * pageSize + 1} – ${Math.min(
        (page + 1) * pageSize,
        length
      )} de ${length}`;
    this.paginatorIntl.itemsPerPageLabel = 'Mostrar por página:';

    // this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit() {
    this.displayedColumns = this.tableInfo
      .filter((column: any) => column.show)
      .map((column: any) =>
        this.isArray(column.id) ? column.id[0] : column.id
      );
    console.log(' this.displayedColumns', this.displayedColumns);
    console.log(' this.tableInfo', this.tableInfo);
  }

  filterActions() {
    return this.tableInfo.filter((column: any) => column.id == 'actions');
  }

  isArray(value: any) {
    return Array.isArray(value);
  }

  showFilter(event: MouseEvent, rowHeader: any) {
    this.activeFilterHeader = rowHeader;
    this.displayFilter = true;

    const filterContainer = this.elementRef.nativeElement.querySelector(
      '.filter-container'
    ) as HTMLElement;
    const table = this.elementRef.nativeElement.querySelector(
      '.mat-table-custom'
    ) as HTMLElement;
    const button = event.currentTarget as HTMLElement;

    const topPosition = button.offsetTop;
    const leftPosition = button.offsetLeft;

    let newLeftPosition =
      table?.offsetLeft >
      leftPosition - (filterContainer?.clientWidth ?? 330) / 2
        ? leftPosition - (leftPosition - 10)
        : leftPosition - (filterContainer?.clientWidth ?? 300) / 2;
    if (newLeftPosition + filterContainer?.clientWidth > table.clientWidth) {
      newLeftPosition = table.clientWidth - filterContainer?.clientWidth - 15;
    }
    this.stylesFilter = {
      top: `${topPosition + button.clientHeight + 15}px`,
      left: `${newLeftPosition}px`,
      width: 'auto'
    };
  }

  changeSize(event: PageEvent) {
    this.pageSizeChange.emit(event.pageSize);
  }

  deleteFilterChip() {
    this.filtersArray = this.filtersArray.filter((valor) => {
      if (valor.value == '') {
        return false; // Filtra los valores vacíos
      }

      return !(
        typeof valor.value === 'object' &&
        valor.value !== null &&
        Object.values(valor.value).every((val) => val === '')
      );

      // Mantén el resto de los elementos en el array
    });
    if (this.filtersArray.length == 0) {
      this.showDeleteFilters = false;
      this.showFilterBar = false;
      this.hardResetFilter();
    } else {
      this.applyColumnFilter();
    }
  }

  deleteAllFiltersChip() {
    this.filtersArray = this.filtersArray.filter((valor) => {
      if (valor.value == '') {
        return false; // Filtra los valores vacíos
      }

      return !(
        typeof valor.value === 'object' &&
        valor.value !== null &&
        Object.values(valor.value).every((val) => val === '')
      );

      // Mantén el resto de los elementos en el array
    });

    this.showDeleteFilters = false;
    this.filtersArray = [];
    this.showFilterBar = false;
    this.hardResetFilter();
  }

  applyColumnFilter(showFilterBar = true) {
    if (this.activeFilterHeader.type === 'date') {
      this.filtersArray.push({
        name: this.activeFilterHeader.name,
        value: this.filtersDateValues
      });
      this.filtersArray = this.actualizarUltimoCampoRepetido(this.filtersArray);
    } else if (this.activeFilterHeader.type === 'array') {
      this.filtersArray.push({
        name: `${this.activeFilterHeader.name} (${this.filterArrayValues.length})`,
        value: this.filterArrayValues
      });
      this.filtersArray = this.actualizarUltimoCampoRepetido(this.filtersArray);
    } else {
      this.filtersArray.push({
        name: this.activeFilterHeader.name,
        value: this.filterValue
      });
      this.filtersArray = this.actualizarUltimoCampoRepetido(this.filtersArray);
    }

    this.showDeleteFilters = this.filtersArray.length >= 2;

    this.filtersArray = this.filtersArray.filter((valor) => {
      if (valor.value == '') {
        return false;
      }

      return !(
        typeof valor.value === 'object' &&
        valor.value !== null &&
        Object.values(valor.value).every((val) => val === '')
      );
    });

    if (!this.showFilterBar) {
      // this.originalData = this.dataSource.data.slice();
    }

    // FILTRAR EN BACK!!!
    this.filtrar();

    this.resetFilter();
    this.showFilterBar = showFilterBar;
  }

  actualizarUltimoCampoRepetido(datos: any) {
    const nombresVistos: { [key: string]: number } = {};
    let indiceUltimoRepetido = -1;

    for (let i = 0; i < datos.length; i++) {
      const nombre = datos[i].name;
      if (nombresVistos[nombre] !== undefined) {
        indiceUltimoRepetido = nombresVistos[nombre];
      }
      nombresVistos[nombre] = i;
    }

    if (indiceUltimoRepetido !== -1) {
      datos.splice(indiceUltimoRepetido, 1);
    }
    return datos;
  }

  filtrar() {
    this.filtrarDatos.emit(this.filtersArray);
  }

  resetFilter() {
    this.displayFilter = false;
    this.enableFilter = false;
    this.filters = {};
    this.filterArrayValues = [];
    this.filtersDateValues = { desde: '', hasta: '' };
    this.filterValue = '';
  }

  hardResetFilter() {
    this.displayFilter = false;
    this.enableFilter = false;
    this.showFilterBar = false;
    this.filters = {};
    // this.dataSource.filter = '';
    this.filterArrayValues = [];
    this.filtersDateValues = { desde: '', hasta: '' };
    this.filterValue = '';
    this.applyColumnFilter(false);
  }

  openFilterMenu(): void {
    this.filterMenuTrigger.openMenu();
  }

  removeFilter(filter: any): void {
    const index = this.filtersArray.indexOf(filter);

    if (index >= 0) {
      this.filtersArray.splice(index, 1);
      if (this.filtersArray.length === 0) {
        this.showFilterBar = false;
      }
    }
  }

  searchOnTable(event: Event): void {
    const value = (event.target as HTMLInputElement)?.value.toLowerCase(); // Convert value to lowercase
    //   this.dataSource.filter = value.trim();
  }

  applyFilter(event?: any): void {
    if (event) {
      const value = (event.target as HTMLInputElement).value
        .trim()
        .toLowerCase();
      this.filterValue = value;
      this.enableFilter = value.length >= 1;
      if (event.key === 'Enter') {
        this.applyColumnFilter();
      }
    }
  }

  uniqueColumnValues(columnName: string): string[] {
    return Array.from(
      new Set(
        this.datosObtenidos?.detalle?.info?.map(
          (item: any) => item[columnName]
        ) || []
      )
    );
  }

  applyCheckboxFilter(option: string, columnName: string): void {
    if (this.selectedOptions[columnName].includes(option)) {
      this.selectedOptions[columnName] = this.selectedOptions[
        columnName
      ].filter((item) => item !== option);
    } else {
      this.selectedOptions[columnName].push(option);
    }
    this.filterDataSource();
  }

  filterDataSource(): void {
    this.dataSource = this.datosObtenidos.detalle.info.filter((item: any) => {
      return Object.keys(this.selectedOptions).every((columnName) => {
        return (
          this.selectedOptions[columnName].length === 0 ||
          this.selectedOptions[columnName].includes(item[columnName])
        );
      });
    });
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  onCheckboxChange(value: any) {
    if (this.filterArrayValues.indexOf(value) === -1) {
      this.filterArrayValues.push(value);
    } else {
      this.filterArrayValues.splice(this.filterArrayValues.indexOf(value), 1);
    }
    this.enableFilter = this.filterArrayValues.length > 0;
  }

  changeInputDate(event: MatDatepickerInputEvent<Date>, type: string) {
    const value = event.value;
    if (value) {
      this.filtersDateValues[type] = this.formatDate(value);
    } else {
      this.filtersDateValues[type] = '';
    }
    this.enableFilter =
      this.filtersDateValues.desde !== '' &&
      this.filtersDateValues.hasta !== '';
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  onGlobalFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.table.filterGlobal(value, 'contains');
  }

  toggleChanged(event: any, row: any): void {
    const isChecked = event.checked;

    // Aquí puedes hacer lo que necesites con el valor actualizado
    // Por ejemplo, actualizar el modelo o llamar a un servicio

    console.log('Toggle cambiado:', { row, isChecked });

    // Si el rowInfo viene con una acción definida, puedes ejecutar algo como:
    // this.rowInfo.action(isChecked, row);

    // O si manejas distintas acciones por tipo de fila:
    // this.miServicio.actualizarEstado(row.id, isChecked).subscribe(...);
  }

  // Descargar PDF
  descargarPDF(row: any): void {
    // Aquí va la lógica real de generación o descarga
    console.log('Descargando PDF de:', row);
    // Ejemplo: window.open(row.urlPdf, '_blank');
  }

  // Editar un registro
  editar(row: any): void {
    console.log('Editando fila:', row);
    // Lógica de navegación o modal
    // this.router.navigate(['/editar', row.id]);
  }

  // Eliminar un registro
  eliminar(row: any): void {
    console.log('Eliminando fila:', row);
    // Confirmación previa
    if (confirm(`¿Estás seguro de eliminar el registro con ID ${row.id}?`)) {
      // Llamada al servicio o lógica de eliminación
    }
  }

  // Ver detalles
  verDetalle(row: any): void {
    console.log('Viendo detalle de:', row);
    // Mostrar modal o navegar a vista de detalle
    // this.router.navigate(['/detalle', row.id]);
  }

  // Otras acciones personalizadas
  duplicar(row: any): void {
    console.log('Duplicando fila:', row);
    // Lógica para duplicar datos
  }
}
