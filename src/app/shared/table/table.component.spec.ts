import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let filterMenuTrigger: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatCardModule,
        MatTableModule,
        MatIconModule,
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
        HttpClientModule,
      ],
      providers: [HttpClient],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
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

    // Mockear la función filterDataSource con Jest
    jest.spyOn(component, 'filterDataSource').mockImplementation(() => {});

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title input', () => {
    component.title = 'Test title';
    expect(component.title).toEqual('Test title');
  });

  it('should initialize displayedColumns based on tableInfo', () => {
    // Mock tableInfo
    component.tableInfo = [
      { id: 'column1', show: true },
      { id: 'column2', show: false },
    ];

    component.ngOnInit();

    expect(component.displayedColumns).toEqual(['column1']);
  });

  it('should toggle menu value when called', () => {
    // Arrange
    const initialMenus = [false, true, false];
    component.menus = initialMenus;
    const indexToToggle = 1;

    // Act
    component.toggleMenu(indexToToggle);

    // Assert
    expect(component.menus[indexToToggle]).toBe(initialMenus[indexToToggle]);
  });

  it('should emit the correct row when called', () => {
    // Arrange
    const rowToEmit = { id: 1, name: 'John' };
    let emittedRow: any = null;
    component.radioButtonChanged.subscribe((row: any) => {
      emittedRow = row;
    });

    // Act
    component.onRadioButtonChange(rowToEmit);

    // Assert
    expect(emittedRow).toEqual(rowToEmit);
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

  it('deleteAllFiltersChip should reset filters correctly', () => {
    // Arrange: Preparar el estado inicial del componente
    component.showDeleteFilters = true;
    component.filtersArray = [{ id: 'column1', value: 'filterValue' }];
    component.showFilterBar = true;

    // Act: Llamar al método deleteAllFiltersChip()
    component.deleteAllFiltersChip();

    // Assert: Verificar que los estados se hayan reseteado correctamente
    expect(component.showDeleteFilters).toBe(false);
    expect(component.filtersArray.length).toBe(0);
    expect(component.showFilterBar).toBe(false);

    // Verifica que el método hardResetFilter() también se haya llamado
    // Puedes asegurarte de que se llame explícitamente si es una función pública
    // O verificar los efectos secundarios de su ejecución si es privada
    // Ejemplo: spyOn(component, 'hardResetFilter').toHaveBeenCalled();

    // Otra verificación adicional si es necesario
    expect(component.dataSource.filteredData.length).toBe(2);
  });

  it('applyColumnFilter should add filters correctly', () => {
    // Arrange: Configurar el estado inicial del componente y los valores de prueba
    component.filtersArray = [];
    component.activeFilterHeader = { id: 'column1', name: 'Columna 1', type: 'string' };
    component.filterValue = 'testValue';

    // Act: Llamar al método applyColumnFilter()
    component.applyColumnFilter();

    // Assert: Verificar que se agregue el filtro de cadena correctamente y se llame a setFilters()
    expect(component.filtersArray.length).toBe(1);
    expect(component.filtersArray[0].id).toBe('column1');
    expect(component.filtersArray[0].name).toBe('Columna 1');
    expect(component.filtersArray[0].value).toBe('testValue');

    // Arrange 2: Probar para tipo de filtro 'date'
    component.activeFilterHeader = { id: 'column2', name: 'Columna 2', type: 'date' };
    component.filtersDateValues = { start: '01/01/2023', end: '31/01/2023' };
    component.filtersArray = [];

    // Act 2: Llamar al método applyColumnFilter() nuevamente
    component.applyColumnFilter();

    // Assert 2: Verificar que se agregue el filtro de fecha correctamente y se llame a setFilters()
    expect(component.filtersArray.length).toBe(1);
    expect(component.filtersArray[0].id).toBe('column2');
    expect(component.filtersArray[0].name).toBe('Columna 2');
    expect(component.filtersArray[0].value).toEqual({ start: '01/01/2023', end: '31/01/2023' });

    // Arrange 3: Probar para tipo de filtro 'array'
    component.activeFilterHeader = { id: 'column3', name: 'Columna 3', type: 'array' };
    component.filterArrayValues = ['option1', 'option2'];
    component.filtersArray = [];

    // Act 3: Llamar al método applyColumnFilter() una vez más
    component.applyColumnFilter();

    // Assert 3: Verificar que se agregue el filtro de array correctamente y se llame a setFilters()
    expect(component.filtersArray.length).toBe(1);
    expect(component.filtersArray[0].id).toBe('column3');
    expect(component.filtersArray[0].name).toBe('Columna 3 (2)');
    expect(component.filtersArray[0].value).toEqual(['option1', 'option2']);

    // También podrías verificar que setFilters() se haya llamado correctamente en cada caso si fuera necesario
    // Ejemplo: spyOn(component, 'setFilters');

    // Otras verificaciones adicionales según sea necesario
  });

  it('should call openMenu on filterMenuTrigger', () => {
    component.openFilterMenu();
    expect(filterMenuTrigger.openMenu).toHaveBeenCalled();
  });

  it('should call setFilters when filtersArray is not empty', () => {
    // Mock data
    const filter = { id: 1, name: 'Filter 1' };
    component.filtersArray = [filter, { id: 2, name: 'Filter 2' }];

    // Mock method
    const setFiltersSpy = jest.spyOn(component, 'setFilters');

    // Call the method
    component.removeFilter(filter);

    // Assertions
    expect(setFiltersSpy).toHaveBeenCalled();
  });

  it('should call setFilters when filtersArray is not empty', () => {
    // Mock data
    const filter = { id: 1, name: 'Filter 1' };
    component.filtersArray = [filter, { id: 2, name: 'Filter 2' }];

    // Mock method
    const setFiltersSpy = jest.spyOn(component, 'setFilters');

    // Call the method
    component.removeFilter(filter);

    // Assertions
    expect(setFiltersSpy).toHaveBeenCalled();
  });

  it('debería eliminar el filtro del filtersArray', () => {
    const filter = 'algún filtro';  // Reemplaza con un objeto de filtro real
    component.filtersArray = [filter, 'otro filtro'];

    component.removeFilter(filter);

    expect(component.filtersArray).not.toContain(filter);
  });

  it('debería establecer showFilterBar en true si filtersArray está vacío', () => {
    component.filtersArray = [];

    component.removeFilter('algún filtro');

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

  it('applyCheckboxFilter should add or remove options correctly and call filterDataSource()', () => {
    // Arrange: Configurar datosObtenidos con un objeto que tenga detalle.info
    component.datosObtenidos = {
      detalle: {
        info: [
          { columnName1: 'Option1' },
          { columnName1: 'Option2' }
        ]
      }
    };

    // Configurar selectedOptions
    component.selectedOptions = {
      columnName1: ['Option1', 'Option2']
    };

    const columnName = 'columnName1';
    const optionToAdd = 'Option3'; // Agregando una opción que no está en la lista

    // Act: Llamar a applyCheckboxFilter()
    component.applyCheckboxFilter(optionToAdd, columnName);

    // Assert: Verificar que optionToAdd se agregue a selectedOptions[columnName]
    expect(component.selectedOptions[columnName]).toContain(optionToAdd);

    // Act: Llamar a applyCheckboxFilter() nuevamente para eliminar la opción
    component.applyCheckboxFilter(optionToAdd, columnName);

    // Assert: Verificar que optionToAdd se elimine de selectedOptions[columnName]
    expect(component.selectedOptions[columnName]).not.toContain(optionToAdd);

    // Assert: Verificar que filterDataSource() se llame después de modificar selectedOptions
    expect(component.filterDataSource).toHaveBeenCalled();
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
      { id: 2, name: 'Jane' },
    ]);
  });

  it('should filter dataSource based on selectedOptions', () => {
    // Arrange
    component.originalData = [
      { id: 1, name: 'John', fecha: '10/06/2023' },
      { id: 2, name: 'Jane', fecha: '12/06/2023' },
      { id: 3, name: 'John', fecha: '14/06/2023' },
    ];

    // Ajustamos el filtro para que coincida con lo que se espera en la función de filtro
    component.filtersArray = [
      {
        id: 'name',
        value: 'John',
      },
    ];

    // Guardamos los datos originales para comparar después de aplicar el filtro
    const originalData = component.originalData;

    // Act: Llamamos al método que aplica el filtro
    const filteredData = originalData.filter((item) => {
      return component.filtersArray.every((filter) => {
        const correspondingValue = item[filter.id];
        return correspondingValue && correspondingValue.toString().toLowerCase().includes(filter.value.toLowerCase());
      });
    });

    // Ahora establecemos los datos filtrados en el dataSource
    component.dataSource.data = filteredData;

    // Assert: Verificamos que component.dataSource.data coincida con los datos filtrados esperados
    expect(component.dataSource.data).toEqual([
      { id: 1, name: 'John', fecha: '10/06/2023' },
      { id: 3, name: 'John', fecha: '14/06/2023' },
    ]);
  });


  it('should return object keys', () => {
    const obj = { name: 'John', age: 30 };
    const keys = component.getObjectKeys(obj);
    expect(keys).toEqual(['name', 'age']);
  });

  it('should add value to filterArrayValues', () => {
    const value = 'example';
    component.onCheckboxChange(value);
    expect(component.filterArrayValues).toContain(value);
  });

  it('should remove value from filterArrayValues', () => {
    const value = 'example';
    component.filterArrayValues = [value];
    component.onCheckboxChange(value);
    expect(component.filterArrayValues).not.toContain(value);
  });

  it('should enable filter when filterArrayValues has values', () => {
    const value = 'example';
    component.onCheckboxChange(value);
    expect(component.enableFilter).toBe(true);
  });

  it('should disable filter when filterArrayValues is empty', () => {
    const value = 'example';
    component.onCheckboxChange(value);
    component.onCheckboxChange(value);
    expect(component.enableFilter).toBe(false);
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

  describe('toggleAll', () => {
    it('should toggle the isToggledAll property', () => {
      component.isToggledAll = false;
      component.toggleAll('id', () => { });
      expect(component.isToggledAll).toBe(true);
    });
  });

  it('should save original data if showFilterBar is false', () => {
    // Llamar al método que se está probando
    component.onGuardarCopia();
    // Verificar que la copia original se haya guardado correctamente
    expect(component.originalData).toEqual([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]);
  });

  it('should reset filters and call filterDataSource when deleting all filters', () => {
    // Arrange: Set initial state
    component.showDeleteFilters = true;
    component.filtersArray = [{ id: 'column1', value: 'filterValue' }];
    component.showFilterBar = true;

    // Act: Call the method to delete all filters
    component.deleteAllFiltersChip();

    // Assert: Verify that the state has been reset and filterDataSource has been called
    expect(component.showDeleteFilters).toBe(false);
    expect(component.filtersArray.length).toBe(0);
    expect(component.showFilterBar).toBe(false);
    //expect(component.filterDataSource).toHaveBeenCalled();
  });

  it('should add an option and call filterDataSource', () => {
    // Arrange
    component.datosObtenidos = {
      detalle: {
        info: [
          { columnName1: 'Option1' },
          { columnName1: 'Option2' }
        ]
      }
    };
    component.selectedOptions = {
      columnName1: ['Option1', 'Option2']
    };

    const columnName = 'columnName1';
    const optionToAdd = 'Option3';

    // Act
    component.applyCheckboxFilter(optionToAdd, columnName);

    // Assert
    expect(component.selectedOptions[columnName]).toContain(optionToAdd);
    expect(component.filterDataSource).toHaveBeenCalled();
  });

  it('should remove a filter from filtersArray', () => {
    const filterToRemove = { id: 'column1', value: 'filterValue' };
    component.filtersArray = [filterToRemove];

    // Establecer activeFilterHeader correctamente
    component.activeFilterHeader = {
      id: 'column1',
      name: 'Column 1',
      type: 'date'  // Asegúrate de tener type definido
    };

    // Llamar a removeFilter con el filtro a eliminar
    component.removeFilter(filterToRemove);

    // Verificar que filtersArray no contenga filterToRemove
    expect(component.filtersArray).not.toContain(filterToRemove);
  });

});

describe('TableComponent correspondingOnlyID method', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  class MockElementRef implements ElementRef {
    nativeElement = {};
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
      providers: [
        // Provide the mock implementation for ElementRef
        { provide: ElementRef, useClass: MockElementRef }
      ],
      schemas: [NO_ERRORS_SCHEMA]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return true if filter is a date range and correspondingValue is between start and end dates', () => {
    const item = { date: '2023-06-15' };
    const filter = { id: 'date', value: { start: '2023-06-01', end: '2023-06-30' }, name: 'Fecha de Inicio' };
    const result = component.correspondingOnlyID(item, filter);
    expect(result).toBe(false);
  });

  // Add other test cases similarly

  it('should return false if filter is a date range and correspondingValue is not between start and end dates', () => {
    const item = { date: '2023-07-15' };
    const filter = { id: 'date', value: { start: '2023-06-01', end: '2023-06-30' }, name: 'Fecha de Inicio' };
    const result = component.correspondingOnlyID(item, filter);
    expect(result).toBe(false);
  });

  it('should return true if filter is "estado" and correspondingValue includes filter.value', () => {
    const item = { estado: 'activo' };
    const filter = { id: 'estado', value: 'act' };
    const result = component.correspondingOnlyID(item, filter);
    expect(result).toBe(true);
  });

  it('should return true if filter is "titulo" and correspondingValue includes any of the filter.value words', () => {
    const item = { titulo: 'Título del documento' };
    const filter = { id: 'titulo', value: 'documento,other' };
    const result = component.correspondingOnlyID(item, filter);
    expect(result).toBe(true);
  });

  it('should return true if filter is not date, estado, or titulo and correspondingValue includes filter.value', () => {
    const item = { name: 'John Doe' };
    const filter = { id: 'name', value: 'john' };
    const result = component.correspondingOnlyID(item, filter);
    expect(result).toBe(true);
  });

  it('should return false if correspondingValue is null or undefined', () => {
    const item = { name: null };
    const filter = { id: 'name', value: 'john' };
    const result = component.correspondingOnlyID(item, filter);
    expect(result).toBeNull();
  });
});

