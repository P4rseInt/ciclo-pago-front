import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tabla',
  templateUrl: './table.component.html',
  styleUrls: [
    // '../../ciclodepago/pagodiario/detalleciclopago/detalleciclopago.component.scss',
    './table.component.scss',
  ],
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() title: string = '';
  @Input() parentClass: string = 'border';
  @Input() tableInfo: any[] = [];
  @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(
    []
  );
  @Input() checksFiltros: any = null;
  @Input() headerButton: any = null;
  @Input() showFilterColumn: boolean = true;
  @Input() searchInputTable: any = false;
  @Input() totalRegisters: number = 10;
  @Input() pill: string = '';
  @Input() estado: string = '';
  @Input() tablaResultado: boolean = true;
  @Input() showPaginator: boolean = true;
  @Input() isInitialData: boolean = false;
  @Input() initialTopPosition: number = 0;
  @Input() classTable = 'mat-table-custom';
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatMenuTrigger) filterMenuTrigger!: MatMenuTrigger;
  @Output() radioButtonChanged = new EventEmitter<void>();

  showDeleteFilters: boolean = false;
  selectedRow: any;
  enableFilter: boolean = false;
  showFilterBar: boolean = false;
  displayedColumns: string[] = [];
  datosObtenidos: any;
  activeFilter: string | null = null;
  resumen: any = null;
  filters: any = {};
  displayFilter: boolean = false;
  activeFilterRow: any;
  activeFilterHeader: any;
  stylesFilter: any = { width: 'auto' };
  selectedValue: string = '1'; // Establece un valor inicial si es necesario
  idSimulacion: any;
  selectedOptions: { [columnName: string]: string[] } = {};
  activeButton: string | null = null;
  selectedRadioButtonIndex: number = -1;
  isToggledAll: boolean = false;

  originalData: any[] = [];
  filtersArray: any[] = [];
  filterValue: any = '';
  filterArrayValues: any[] = [];
  filtersDateValues: any = {
    start: '',
    end: '',
  };
  fechaHasta: Date | null = null;
  minEndDate: Date | null = null;
  enableEndDateButton: boolean = false;
  menus: boolean[] = [];

  constructor(
    private paginatorIntl: MatPaginatorIntl,
    private cdRef: ChangeDetectorRef,
    private elementRef: ElementRef
  ) {
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

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit() {
    this.displayedColumns = this.tableInfo
      .filter((column: any) => column.show)
      .map((column: any) =>
        this.isArray(column.id) ? column.id[0] : column.id
      );
    this.dataSource.connect().subscribe(data => {
      this.originalData = this.dataSource.data;
    });
  }

  toggleMenu(index: number) {
    this.menus[index] = !this.menus[index];
  }

  toggleAll(id: string, callback: any) {
    this.isToggledAll = !this.isToggledAll;
    this.dataSource.data.forEach((row: any) => {
      callback(this.isToggledAll, row, 'all');
    });
  }

  onRadioButtonChange(row: any) {
    this.radioButtonChanged.emit(row);
  }

  isArray(value: any) {
    return Array.isArray(value);
  }

  showFilter(event: MouseEvent, rowHeader: any) {
    this.activeFilterHeader = rowHeader;
    this.displayFilter = true;

    this.cdRef.detectChanges();

    const filterContainer = this.elementRef.nativeElement.querySelector('.filter-container') as HTMLElement;
    const button = event.currentTarget as HTMLElement;
    const table = this.elementRef.nativeElement.querySelector('.mat-table-custom') as HTMLElement;

    if (typeof button?.getBoundingClientRect === 'function') {
      const leftPosition = button.offsetLeft;
      let newLeftPosition =
        table?.offsetLeft >
          leftPosition - (filterContainer?.clientWidth ?? 330) / 2
          ? leftPosition - (leftPosition + 10)
          : button?.getBoundingClientRect().right - filterContainer?.offsetWidth * 2
      if (newLeftPosition + filterContainer?.clientWidth > table.clientWidth) {
        newLeftPosition = (button?.getBoundingClientRect().right - filterContainer?.offsetWidth * 2) - 65;
      }
      this.stylesFilter = {
        left: `${newLeftPosition}px`,
      };
    }
    if (this.initialTopPosition > 0) {
      this.stylesFilter.top = `${this.initialTopPosition}em`;
    }
  }

  deleteAllFiltersChip() {
    this.showDeleteFilters = false;
    this.filtersArray = [];
    this.showFilterBar = false;
    this.hardResetFilter();
  }

  applyColumnFilter() {
    if (this.activeFilterHeader.type === 'date') {
      this.filtersArray.push({
        id: this.activeFilterHeader.id,
        name: this.activeFilterHeader.name,
        value: this.filtersDateValues,
      });
    } else if (this.activeFilterHeader.type === 'array') {
      this.filtersArray.push({
        id: this.activeFilterHeader.id,
        name: `${this.activeFilterHeader.name} (${this.filterArrayValues.length})`,
        value: this.filterArrayValues,
      });
    } else {
      this.filtersArray.push({
        id: this.activeFilterHeader.id,
        name: this.activeFilterHeader.name,
        value: this.filterValue,
      });
    }
    this.setFilters();
  }

  resetFilter() {
    this.displayFilter = false;
    this.enableFilter = false;
    this.filters = {};
    this.filterArrayValues = [];
    this.filtersDateValues = { start: '', end: '' };
    this.filterValue = '';
  }
  hardResetFilter() {
    this.dataSource = new MatTableDataSource(this.originalData);
    this.displayFilter = false;
    this.enableFilter = false;
    this.filters = {};
    this.dataSource.filter = '';
    this.filterArrayValues = [];
    this.filtersDateValues = { start: '', end: '' };
    this.filterValue = '';
  }

  openFilterMenu(): void {
    this.filterMenuTrigger.openMenu();
  }

  removeFilter(filter: any): void {
    const index = this.filtersArray.indexOf(filter);
    if (index >= 0) {
      this.filtersArray.splice(index, 1);
      if (this.filtersArray.length === 0) {
        this.showFilterBar = true;
        this.applyColumnFilter();
        this.deleteAllFiltersChip();
        this.setFilters(false);
      } else {
        this.setFilters();
      }
    }
  }

  isBetweenDate(fecha: string, inicioRango: string, finRango: string) {
    // Convertir cadenas a objetos Date
    const fechaObj = new Date(
      `${fecha.split('/')[1]}/${fecha.split('/')[0]}/${fecha.split('/')[2]}`
    );
    const inicioRangoObj = new Date(
      `${inicioRango.split('/')[1]}/${inicioRango.split('/')[0]}/${inicioRango.split('/')[2]
      }`
    );
    const finRangoObj = new Date(
      `${finRango.split('/')[1]}/${finRango.split('/')[0]}/${finRango.split('/')[2]
      }`
    );

    // Comparar valores numéricos de los objetos Date
    return (
      fechaObj.getTime() >= inicioRangoObj.getTime() &&
      fechaObj.getTime() <= finRangoObj.getTime()
    );
  }

  onShowDeleteFilters() {
    if (this.filtersArray.length >= 2) {
      this.showDeleteFilters = true;
    } else {
      this.showDeleteFilters = false;
    }
  }

  onGuardarCopia() {
    if (!this.showFilterBar) {
      this.originalData = this.dataSource.data.slice();
    }
  }

  setFilters(showFilterBar: boolean = true) {
    this.onShowDeleteFilters();
    const filteredData = this.originalData.filter((item) => {
      return this.filtersArray.every((filter) => {
        // Verificar si el filtro contiene múltiples ids
        if (Array.isArray(filter.id)) {
          // Si hay múltiples ids, iterar sobre cada uno y verificar si alguno coincide
          return filter.id.some((id: any) => {
            const correspondingValue = item[id];
            if (
              typeof filter.value === 'object' &&
              filter.name.includes('Fecha')
            ) {
              return (
                correspondingValue &&
                this.isBetweenDate(
                  correspondingValue,
                  filter.value.start,
                  filter.value.end
                )
              );
            } else {
              return (
                correspondingValue &&
                correspondingValue
                  .toString()
                  .toLowerCase()
                  .includes(filter.value.toLowerCase())
              );
            }
          });
        } else {
          // Si solo hay un id, buscar el valor correspondiente en item
          return this.correspondingOnlyID(item, filter);
        }
      });
    });
    this.dataSource = new MatTableDataSource(filteredData);
    this.dataSource.paginator = this.paginator;
    this.totalRegisters = filteredData.length;
    this.resetFilter();
    this.showFilterBar = showFilterBar;
  }

  correspondingOnlyID(item: any, filter: any) {
    const correspondingValue = item[filter.id];
    if (typeof filter.value === 'object' && filter.name.includes('Fecha')) {
      return (
        correspondingValue &&
        this.isBetweenDate(
          correspondingValue,
          filter.value.start,
          filter.value.end
        )
      );
    } else if (filter.id === 'estado' || filter.id === 'titulo') {
      const filterString = filter.value.toString();
      const filterWords = filterString.split(',');
      return (
        correspondingValue &&
        filterWords.some((word: any) =>
          correspondingValue.toString().toLowerCase().includes(word.trim().toLowerCase())
        )
      );
    } else {
      return (
        correspondingValue &&
        correspondingValue
          .toString()
          .toLowerCase()
          .includes(filter.value.toLowerCase())
      );
    }
  }

  searchOnTable(event: Event): void {
    const value = (event.target as HTMLInputElement)?.value.toLowerCase(); // Convert value to lowercase
    this.dataSource.filter = value.trim();
  }

  applyFilter(event?: any): void {
    if (event) {
      const value = (event.target as HTMLInputElement).value
        .trim()
        .toLowerCase();
      this.filterValue = value;
      this.enableFilter = value.length >= 1 ? true : false;
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
    this.dataSource.data = this.datosObtenidos.detalle.info.filter(
      (item: any) => {
        return Object.keys(this.selectedOptions).every((columnName) => {
          return (
            this.selectedOptions[columnName].length === 0 ||
            this.selectedOptions[columnName].includes(item[columnName])
          );
        });
      }
    );
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
    if (this.filterArrayValues.length > 0) {
      this.enableFilter = true;
    } else {
      this.enableFilter = false;
    }
  }

  changeInputDate(event: MatDatepickerInputEvent<Date>, type: string) {
    const value = event.value;
    if (value) {
      const fechaFormateada = this.formatDate(value);

      this.filtersDateValues[type] = fechaFormateada;
    } else {
      this.filtersDateValues[type] = '';
    }
    if (this.filtersDateValues.start !== '' && this.filtersDateValues.end !== '' && this.stringToDate(this.filtersDateValues.start) > this.stringToDate(this.filtersDateValues.end)) {
      this.filtersDateValues.end = '';
      this.fechaHasta = null;
    }
    if (this.filtersDateValues.start !== '') {
      this.minEndDate = event.value!;
      this.enableEndDateButton = true;
    } else {
      this.enableEndDateButton = false;
    }
    if (
      this.filtersDateValues.start !== '' &&
      this.filtersDateValues.end !== ''
    ) {
      this.enableFilter = true;
    } else {
      this.enableFilter = false;
    }
  }

  stringToDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
}
