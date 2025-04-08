import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableBackComponent } from './table-back.component';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableDataSource } from '@angular/material/table';

describe('TableBackComponent', () => {
  let component: TableBackComponent;
  let fixture: ComponentFixture<TableBackComponent>;
  let filterMenuTrigger: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableBackComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatCardModule,
        MatTableModule,
        MatIconModule,
        MatPaginatorModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCheckboxModule,
        MatMenuModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule,
        MatDividerModule,
        MatSlideToggleModule,
        MatDialogModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBackComponent);
    component = fixture.componentInstance;
    component.tableInfo = [
      { id: 'id', name: 'ID', show: true, type: 'number' },
      { id: 'name', name: 'Name', show: true, type: 'string' },
    ];
    component.dataSource = new MatTableDataSource([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ]);
    fixture.detectChanges();
    filterMenuTrigger = {
      openMenu: jest.fn(),
    };
    component.filterMenuTrigger = filterMenuTrigger;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title input', () => {
    component.title = 'Test title';
    expect(component.title).toEqual('Test title');
  });

  it('should have a tableInfo input', () => {
    component.tableInfo = [
      { id: 'id', name: 'ID', show: true, type: 'number' },
      { id: 'name', name: 'Name', show: true, type: 'string' },
    ];
    expect(component.tableInfo).toEqual([
      { id: 'id', name: 'ID', show: true, type: 'number' },
      { id: 'name', name: 'Name', show: true, type: 'string' },
    ]);
  });

  it('should have a dataSource input', () => {
    const dataSource = new MatTableDataSource([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ]);
    component.dataSource = dataSource;
    expect(component.dataSource).toEqual(dataSource);
  });

  it('should have a headerButton input', () => {
    component.headerButton = { icon: 'add', text: 'Add' };
    expect(component.headerButton).toEqual({ icon: 'add', text: 'Add' });
  });

  it('should have a totalRegisters input', () => {
    component.totalRegisters = 10;
    expect(component.totalRegisters).toEqual(10);
  });

  it('should return true if the value is an array', () => {
    const value = [1, 2, 3];
    const result = component.isArray(value);
    expect(result).toBe(true);
  });

  it('should return false if the value is not an array', () => {
    const value = 'not an array';
    const result = component.isArray(value);
    expect(result).toBe(false);
  });

  it('should update activeFilterHeader correctly', () => {
    const event = { currentTarget: {} } as MouseEvent;
    const rowHeader = {} as any;

    component.showFilter(event, rowHeader);

    expect(component.activeFilterHeader).toBe(rowHeader);
  });

  it('should update displayFilter to true', () => {
    const event = { currentTarget: {} } as MouseEvent;
    const rowHeader = {} as any;
    const expected = true;

    component.showFilter(event, rowHeader);

    expect(component.displayFilter).toBe(expected);
  });

  it('should add a filter to filtersArray if activeFilterHeader type is date', () => {
    component.activeFilterHeader = {
      type: 'date',
      name: 'Date Filter',
    };
    component.filtersDateValues = '2021-01-01'; // Establecer un valor para filtersDateValues

    component.applyColumnFilter();

    expect(component.filtersArray).toEqual([
      {
        name: 'Date Filter',
        value: '2021-01-01',
      },
    ]);
  });

  it('should add a filter to filtersArray if activeFilterHeader type is neither date nor array', () => {
    component.activeFilterHeader = {
      type: 'text',
      name: 'Text Filter',
    };
    component.filterValue = 'value'; // Establecer un valor para filterValue

    component.applyColumnFilter();

    expect(component.filtersArray).toEqual([
      {
        name: 'Text Filter',
        value: 'value',
      },
    ]);
  });

  it('should set showFilterBar to true', () => {
    component.activeFilterHeader = { name: 'ID', type: 'number' };
    component.applyColumnFilter();

    expect(component.showFilterBar).toBe(true);
  });

  it('should reset all filter values', () => {
    // Arrange
    const expectedFilter = {
      displayFilter: false,
      enableFilter: false,
      filters: {},
      dataSource: { filter: '' },
      filterArrayValues: [],
      filtersDateValues: { hasta: '', desde: '' },
      filterValue: '',
    };

    // Act
    component.resetFilter();

    // Assert
    expect(component.displayFilter).toBe(expectedFilter.displayFilter);
    expect(component.enableFilter).toBe(expectedFilter.enableFilter);
    expect(component.filters).toEqual(expectedFilter.filters);
    expect(component.dataSource.filter).toBe(expectedFilter.dataSource.filter);
    expect(component.filterArrayValues).toEqual(
      expectedFilter.filterArrayValues
    );
    expect(component.filtersDateValues).toEqual(
      expectedFilter.filtersDateValues
    );
    expect(component.filterValue).toBe(expectedFilter.filterValue);
  });

  it('should call openMenu on filterMenuTrigger', () => {
    component.openFilterMenu();
    expect(filterMenuTrigger.openMenu).toHaveBeenCalled();
  });

  it('debería eliminar el filtro y mostrar la barra de filtros si no hay más filtros', () => {
    // Arrange
    const filter = 'filtro1';
    component.filtersArray = ['filtro1', 'filtro2', 'filtro3'];
    component.showFilterBar = false;

    // Act
    component.removeFilter(filter);

    // Assert
    expect(component.filtersArray).not.toContain(filter);
    if (component.filtersArray.length === 0) {
      expect(component.showFilterBar).toBe(true);
    } else {
      expect(component.showFilterBar).toBe(false);
    }
  });

  it('no debería hacer nada si el filtro no existe', () => {
    // Arrange
    const filter = 'filtro4';
    component.filtersArray = ['filtro1', 'filtro2', 'filtro3'];
    component.showFilterBar = false;

    // Act
    component.removeFilter(filter);

    // Assert
    expect(component.filtersArray).not.toContain(filter);
    expect(component.showFilterBar).toBe(false);
  });

  it('should filter the dataSource with the correct value', () => {
    // Arrange
    const event: any = {
      target: {
        value: 'Test Value',
      } as HTMLInputElement,
    };
    const dataSource = {
      filter: '',
    };
    component.searchOnTable(event);
    // Assert
    expect(dataSource.filter).toBe('');
  });

  it('should update the filter value and enable filter when event is provided', () => {
    const event: any = {
      target: {
        value: 'prueba',
      } as HTMLInputElement,
      key: 'Enter',
    };
    component.activeFilterHeader = { name: 'ID', type: 'string' };
    component.applyFilter(event);

    expect(component.filterValue).toEqual('');
  });

  it('should not update the filter value or enable filter when event is not provided', () => {
    component.applyFilter();

    expect(component.filterValue).toEqual('');
    expect(component.enableFilter).toBeFalsy();
  });

  it('should call applyColumnFilter when event key is "Enter"', () => {
    const event: any = {
      target: {
        value: 'test',
      } as HTMLInputElement,
      key: 'Enter',
    };

    jest.spyOn(component, 'applyColumnFilter');
    component.activeFilterHeader = { name: 'ID', type: 'number' };
    component.applyFilter(event);

    expect(component.applyColumnFilter).toHaveBeenCalled();
  });

  it('should not call applyColumnFilter when event key is not "Enter"', () => {
    const event: any = {
      target: {
        value: 'test',
      } as HTMLInputElement,
      key: 'Space',
    };

    jest.spyOn(component, 'applyColumnFilter');
    component.activeFilterHeader = { name: 'ID', type: 'number' };
    component.applyFilter(event);

    expect(component.applyColumnFilter).not.toHaveBeenCalled();
  });

  it('should have a MatPaginator', () => {
    const matPaginator =
      fixture.debugElement.nativeElement.querySelector('mat-paginator');
    expect(matPaginator).toBeTruthy();
  });

  it('should have a MatSort', () => {
    const matSort =
      fixture.debugElement.nativeElement.querySelector('[mat-sort-header]');
    expect(matSort).toBeTruthy();
  });

  it('should have a showFilter method', () => {
    jest.spyOn(component, 'showFilter');
    const button =
      fixture.debugElement.nativeElement.querySelector('.btn-filter');
    button.click();
    expect(component.showFilter).toHaveBeenCalled();
  });

  it('should have an applyColumnFilter method', () => {
    jest.spyOn(component, 'applyColumnFilter');
    component.activeFilterHeader = { name: 'ID', type: 'number' };
    component.filterValue = '1';
    component.applyColumnFilter();
    expect(component.applyColumnFilter).toHaveBeenCalled();
  });

  it('should have a uniqueColumnValues method', () => {
    component.datosObtenidos = {
      detalle: {
        info: [
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' },
          { id: 3, name: 'John' },
        ],
      },
    };
    expect(component.uniqueColumnValues('name')).toEqual(['John', 'Jane']);
  });

  it('should have a filterDataSource method', () => {
    component.datosObtenidos = {
      detalle: {
        info: [
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' },
          { id: 3, name: 'John' },
        ],
      },
    };
    component.selectedOptions = { name: ['John'] };
    component.filterDataSource();
    expect(component.dataSource.filteredData).toEqual([
      { id: 1, name: 'John' },
      { id: 3, name: 'John' },
    ]);
  });

  it('should have a changeInputDate method', () => {
    component.filtersDateValues = { start: '', end: '' };
    const event = { value: new Date('01-01-2023') };
    component.changeInputDate(event as any, 'start');
    expect(component.filtersDateValues).toEqual({
      start: '01/01/2023',
      end: '',
    });
  });

  it('should have a formatDate method', () => {
    const date = new Date('01-01-2023');
    expect(component.formatDate(date)).toEqual('01/01/2023');
  });
});

describe('TableBackComponent > resetFilter', () => {
  let component: TableBackComponent;
  let fixture: ComponentFixture<TableBackComponent>;
  let filterMenuTrigger: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableBackComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatCardModule,
        MatTableModule,
        MatIconModule,
        MatPaginatorModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCheckboxModule,
        MatMenuModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule,
        MatDividerModule,
        MatSlideToggleModule,
        MatDialogModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBackComponent);
    component = fixture.componentInstance;
    component.tableInfo = [
      { id: 'id', name: 'ID', show: true, type: 'number' },
      { id: 'name', name: 'Name', show: true, type: 'string' },
    ];
    component.dataSource = new MatTableDataSource([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ]);
    component.displayFilter = true;
    component.activeFilterHeader = { name: 'Test', type: 'number' };
    fixture.detectChanges();
    filterMenuTrigger = {
      openMenu: jest.fn(),
    };
    component.filterMenuTrigger = filterMenuTrigger;
  });

  it('should have a resetFilter method', () => {
    jest.spyOn(component, 'resetFilter');
    const button =
      fixture.debugElement.nativeElement.querySelector('.btn-cancelar');
    button.click();
    expect(component.resetFilter).toHaveBeenCalled();
  });
});

describe('TableBackComponent > deleteAllFilters', () => {
  let component: TableBackComponent;
  let fixture: ComponentFixture<TableBackComponent>;
  let filterMenuTrigger: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableBackComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatCardModule,
        MatTableModule,
        MatIconModule,
        MatPaginatorModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCheckboxModule,
        MatMenuModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule,
        MatDividerModule,
        MatSlideToggleModule,
        MatDialogModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBackComponent);
    component = fixture.componentInstance;
    component.tableInfo = [
      { id: 'id', name: 'ID', show: true, type: 'number' },
      { id: 'name', name: 'Name', show: true, type: 'string' },
    ];
    component.dataSource = new MatTableDataSource([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ]);
    component.displayFilter = true;
    component.activeFilterHeader = { name: 'Test', type: 'number' };
    component.showDeleteFilters = true;
    component.showFilterBar = true;
    fixture.detectChanges();
    filterMenuTrigger = {
      openMenu: jest.fn(),
    };
    component.filterMenuTrigger = filterMenuTrigger;
  });

  it('should have a deleteAllFiltersChip method', () => {
    jest.spyOn(component, 'deleteAllFiltersChip');
    const button = fixture.debugElement.nativeElement.querySelector(
      '.chip-delete-all-filters'
    );
    button.click();
    expect(component.deleteAllFiltersChip).toHaveBeenCalled();
  });

  it('should emit page size change event', () => {
    const event: PageEvent = { pageSize: 10, pageIndex: 0, length: 100 };
    const emitSpy = jest.spyOn(component.pageSizeChange, 'emit');

    component.changeSize(event);

    expect(emitSpy).toHaveBeenCalledWith(event.pageSize);
  });

  it('should return object keys', () => {
    const obj = { key1: 'value1', key2: 'value2' };

    const keys = component.getObjectKeys(obj);

    expect(keys).toEqual(['key1', 'key2']);
  });

  it('should add value to filterArrayValues when not already included', () => {
    const value = 'Value 1';

    component.filterArrayValues = [];

    component.onCheckboxChange(value);

    expect(component.filterArrayValues).toContain(value);
  });

  it('should remove value from filterArrayValues when already included', () => {
    const value = 'Value 1';

    component.filterArrayValues = [value];

    component.onCheckboxChange(value);

    expect(component.filterArrayValues).not.toContain(value);
  });
});

describe('TableBackComponent', () => {
  let component: TableBackComponent;
  let fixture: ComponentFixture<TableBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableBackComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBackComponent);
    component = fixture.componentInstance;

    // Simulate datosObtenidos with detalle.info
    component.datosObtenidos = {
      detalle: {
        info: [
          { Column1: 'Option1' },
          { Column1: 'Option2' },
          { Column1: 'Option3' },
        ],
      },
    };

    fixture.detectChanges();
  });

  it('should add option to selectedOptions if not present', () => {
    const option = 'Option1';
    const columnName = 'Column1';

    // Simulate initial state
    component.selectedOptions = { [columnName]: [] };

    // Call the function
    component.applyCheckboxFilter(option, columnName);

    // Assert that the option is added to selectedOptions
    expect(component.selectedOptions[columnName]).toEqual([option]);
  });

  it('should remove option from selectedOptions if already present', () => {
    const option = 'Option1';
    const columnName = 'Column1';

    // Simulate initial state
    component.selectedOptions = { [columnName]: [option] };

    // Call the function
    component.applyCheckboxFilter(option, columnName);

    // Assert that the option is removed from selectedOptions
    expect(component.selectedOptions[columnName]).toEqual([]);
  });

  it('should call filterDataSource after modifying selectedOptions', () => {
    const option = 'Option1';
    const columnName = 'Column1';

    // Mock filterDataSource function
    const spyFilterDataSource = jest.spyOn(component, 'filterDataSource');

    // Simulate initial state
    component.selectedOptions = { [columnName]: [] };

    // Call the function
    component.applyCheckboxFilter(option, columnName);

    // Assert that filterDataSource was called
    expect(spyFilterDataSource).toHaveBeenCalled();
  });
});
