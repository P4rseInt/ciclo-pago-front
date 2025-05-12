import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TablaGeneralComponent } from './tabla-general.component';
import {
  Boton,
  ModeloColumnas,
  PropiedadesTabla
} from '@models/tabla-general/table-model';
import { ResBusquedaModelo } from '@shared/parametros-busqueda/parametros-busqueda.component';
import { SimpleChange } from '@angular/core';
import { TestingModule } from '../../testing/testing.module';
import { Table } from 'primeng/table';
import FileSaver from 'file-saver';

jest.mock('file-saver', () => ({
  saveAs: jest.fn()
}));

describe('TablaGeneralComponent', () => {
describe('TablaGeneralComponent', () => {
  let component: TablaGeneralComponent;
  let fixture: ComponentFixture<TablaGeneralComponent>;

  // Datos de prueba para las entradas requeridas del componente
  const mockTableData = [
    {
      id: 1,
      nombre: 'Prueba 1',
      estado: 'Activo',
      fecha: new Date('2023-01-01')
    },
    {
      id: 2,
      nombre: 'Prueba 2',
      estado: 'Inactivo',
      fecha: new Date('2023-02-01')
    }
  ];

  const mockCols: ModeloColumnas[] = [
    { field: 'id', header: 'ID', hasFilter: true, filterType: 'numeric' },
    { field: 'nombre', header: 'Nombre', hasFilter: true, filterType: 'text' },
    { field: 'estado', header: 'Estado', hasFilter: true, filterType: 'text' },
    { field: 'fecha', header: 'Fecha', hasFilter: true, filterType: 'date' }
  ];

  const mockActionCols: ModeloColumnas[] = [
    ...mockCols,
    {
      field: 'acciones',
      header: 'Acciones',
      hasFilter: false,
      actions: [
        {
          actionName: 'ver',
          icon: 'pi pi-eye',
          clickHandler: jest.fn()
        },
        {
          actionName: 'eliminar',
          icon: 'pi pi-trash',
          clickHandler: jest.fn()
        }
      ]
    }
  ];

  const mockRespuestaBusqueda: ResBusquedaModelo = {
    creacion: ['Prueba'],
    numero: '',
    usuarioCreacion: ''
  };

  const mockBoton: Boton = {
    title: 'Botón de prueba',
    icon: 'pi pi-plus',
    class: 'p-button-success',
    type: 'button',
    clickHandler: jest.fn()
  };

  const mockPropiedadesTabla: PropiedadesTabla = {
    topButtons: [mockBoton],
    tableTitle: 'Tabla de prueba',
    hasCleanFilterButton: true,
    hasDownloadButton: true,
    hasPaginator: true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaGeneralComponent],
      imports: [TestingModule]
    });

    fixture = TestBed.createComponent(TablaGeneralComponent);
    component = fixture.componentInstance;

    // Inicializar las propiedades @Input requeridas
    // component.tableData = mockTableData;
    // component.cols = mockCols;
    // component.respuestaBusqueda = null;
    // component.boton = mockBoton;
    // component.propiedadesTabla = mockPropiedadesTabla;
    //
    // // Crear un mock para la tabla de PrimeNG
    // component.table = {
    //   filter: jest.fn(),
    //   filterGlobal: jest.fn(),
    //   clear: jest.fn()
    // } as unknown as Table;

    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializarse con los datos mock', () => {
    expect(component.tableData).toEqual(mockTableData);
    expect(component.cols).toEqual(mockCols);
  });

  it('debería filtrar columnas únicas', () => {
    component.cols = [
      ...mockCols,
      {
        field: 'id',
        header: 'ID Duplicado',
        hasFilter: true,
        filterType: 'numeric'
      }
    ];

    const columnas = component.getColumns();

    // Debe filtrar las columnas duplicadas
    expect(columnas.length).toBe(mockCols.length);
    expect(columnas.find((col) => col.field === 'id')?.header).toBe('ID');
  });

  it('debería mantener la última columna duplicada cuando keepLast es verdadero', () => {
    const columnasDuplicadas: ModeloColumnas[] = [
      ...mockCols,
      {
        field: 'id',
        header: 'ID Duplicado',
        hasFilter: true,
        filterType: 'numeric'
      }
    ];

    const resultado = component.filterUniqueCols(columnasDuplicadas, true);

    // Debe mantener la última columna duplicada
    expect(resultado.length).toBe(mockCols.length);
    expect(resultado.find((col) => col.field === 'id')?.header).toBe(
      'ID Duplicado'
    );
  });

  it('debería devolver los datos de la tabla', () => {
    const datos = component.getTableData();
    expect(datos).toEqual(mockTableData);
  });

  it('debería obtener los campos para el filtro global', () => {
    const campos = component.getGlobalFilterFields();
    expect(campos).toEqual(mockCols.map((col) => col.field));
  });

  it('debería llamar a clear en la tabla cuando se llama a clearFilters', () => {
    const tablaMock = { clear: jest.fn() } as unknown as Table;

    component.clearFilters(tablaMock);

    expect(tablaMock.clear).toHaveBeenCalled();
  });

  it('debería llamar a filterGlobal en la tabla cuando se llama a onGlobalFilter', () => {
    const evento = { target: { value: 'test' } } as unknown as Event;
    const spy = jest.spyOn(component.table, 'filterGlobal');

    component.onGlobalFilter(evento);
    expect(spy).toHaveBeenCalledWith('test', 'contains');
  });

  it('debería determinar correctamente el tipo de plantilla de filtro', () => {
    const colDropdown = {
      field: 'test',
      header: 'Test',
      hasFilter: true,
      filterType: 'dropdown'
    } as ModeloColumnas;
    const colDate = {
      field: 'test',
      header: 'Test',
      hasFilter: true,
      filterType: 'date'
    } as ModeloColumnas;
    const colTexto = {
      field: 'test',
      header: 'Test',
      hasFilter: true,
      filterType: 'text'
    } as ModeloColumnas;
    const colSinFiltro = {
      field: 'test',
      header: 'Test',
      hasFilter: false
    } as ModeloColumnas;

    expect(component.getFilterTemplateType(colDropdown)).toBe('dropdown');
    expect(component.getFilterTemplateType(colDate)).toBe('date');
    expect(component.getFilterTemplateType(colTexto)).toBe('default');
    expect(component.getFilterTemplateType(colSinFiltro)).toBe('default');
  });

  it('debería devolver las acciones de columna cuando existen', () => {
    component.cols = mockActionCols;

    const colAcciones = component.cols.find((col) => col.field === 'acciones');
    const acciones = component.getColumnActions(colAcciones as ModeloColumnas);

    expect(acciones.length).toBe(2);
    expect(acciones[0].actionName).toBe('ver');
    expect(acciones[1].actionName).toBe('eliminar');
  });

  it('debería devolver un array vacío cuando no existen acciones', () => {
    const colSinAcciones = {
      field: 'test',
      header: 'Test',
      hasFilter: false
    } as ModeloColumnas;

    const acciones = component.getColumnActions(colSinAcciones);

    expect(acciones).toEqual([]);
  });

  it('debería identificar correctamente los campos de fecha', () => {
    expect(component.isDateField('fecha')).toBe(true);
    expect(component.isDateField('nombre')).toBe(false);
  });

  it('debería formatear los campos de fecha para la exportación a Excel', () => {
    const valorFecha = new Date('2023-01-01');
    const nombreCampo = 'fecha';

    const valorFormateado = component['formatExcelValue'](
      valorFecha,
      nombreCampo
    );

    // El resultado dependerá de la configuración regional
    expect(typeof valorFormateado).toBe('string');
  });

  it('debería aplicar estilos basados en ngClassField', () => {
    const filaDatos = {
      estado: 'Activo',
      ngClassField: {
        fields: [
          {
            fieldName: 'estado',
            stylesByValue: {
              Activo: 'success',
              Inactivo: 'danger'
            }
          }
        ]
      }
    };

    const estilo = component.getNgClassStyle(filaDatos, 'estado');

    expect(estilo).toBe('success');
  });

  it('debería devolver null cuando no existe ngClassField', () => {
    const filaDatos = { estado: 'Activo' };

    const estilo = component.getNgClassStyle(filaDatos, 'estado');

    expect(estilo).toBeNull();
  });

  it('debería devolver el estilo de etiqueta correcto para cada clase de estilo', () => {
    expect(component.getTagStyle('success')).toContain(
      'background-color: #E1F2D9'
    );
    expect(component.getTagStyle('warning')).toContain(
      'background-color: #FFE5B5'
    );
    expect(component.getTagStyle('danger')).toContain(
      'background-color: #FFD9E1'
    );
    expect(component.getTagStyle('desconocido')).toBe('text-white-800');
  });

  it('debería alternar la clase de fila según el índice', () => {
    expect(component.rowClass(0)).toBe('bg-white-200 text-black');
    expect(component.rowClass(1)).toBe('bg-gray-200 text-black');
    expect(component.rowClass(2)).toBe('bg-white-200 text-black');
  });

  describe('ngOnChanges', () => {
    it('debería llamar a resBusqueda cuando respuestaBusqueda cambia', () => {
      const resBusquedaSpy = jest.spyOn(component, 'resBusqueda');
      component.respuestaBusqueda = mockRespuestaBusqueda;

      component.ngOnChanges({
        respuestaBusqueda: new SimpleChange(null, mockRespuestaBusqueda, true)
      });

      expect(resBusquedaSpy).toHaveBeenCalled();
    });

    it('no debería llamar a resBusqueda cuando respuestaBusqueda es null', () => {
      const resBusquedaSpy = jest.spyOn(component, 'resBusqueda');

      component.ngOnChanges({
        respuestaBusqueda: new SimpleChange(null, null, true)
      });

      expect(resBusquedaSpy).not.toHaveBeenCalled();
    });
  });

  describe('resBusqueda', () => {
    it('debería limpiar el filtro global y aplicar filtros específicos', () => {
      component.respuestaBusqueda = mockRespuestaBusqueda;

      // 1) espiar filterGlobal pero NO ejecutar su impl. original
      const filterGlobalSpy = jest
        .spyOn(component.table, 'filterGlobal')
        .mockImplementation(() => {});

      // 2) espiar filter, y tampoco ejecutar nada
      const filterSpy = jest
        .spyOn(component.table, 'filter')
        .mockImplementation(() => {});

      component.resBusqueda();

      // se llamó exactamente a filterGlobal('', 'contains')
      expect(filterGlobalSpy).toHaveBeenCalledWith('', 'contains');

      // se llamó exactamente a filter(['Prueba'], 'creacion', 'contains')
      expect(filterSpy).toHaveBeenCalledWith(
        ['Prueba'],
        'creacion',
        'contains'
      );

      // no debe haberse llamado con campos vacíos
      expect(filterSpy).not.toHaveBeenCalledWith('', 'numero', 'contains');
      expect(filterSpy).not.toHaveBeenCalledWith(
        '',
        'usuarioCreacion',
        'contains'
      );
    });
  });

  describe('exportTableToExcel', () => {
    it('debería formatear datos y llamar a FileSaver.saveAs', () => {
      const saveAsSpy = jest.spyOn(FileSaver, 'saveAs');

      component.exportTableToExcel();

      expect(saveAsSpy).toHaveBeenCalled();
      // El primer argumento debe ser un Blob
      expect(saveAsSpy.mock.calls[0][0] instanceof Blob).toBe(true);
      // El segundo argumento debe ser el nombre del archivo
      expect(saveAsSpy.mock.calls[0][1]).toBe('ciclos-pago.xlsx');
    });
  });
});
