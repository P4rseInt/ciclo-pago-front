import { Component, OnInit } from '@angular/core';
import { Message, PrimeIcons } from 'primeng/api';
import moment from 'moment/moment';
import {
  ModeloColumnas,
  ModeloDatosTabla,
  PropiedadesTabla
} from '@models/tabla-general/table-model';
import { Router } from '@angular/router';
import { DataService } from '@services/data.service';

@Component({
  selector: 'app-listado-ciclos',
  templateUrl: './listado-ciclos.component.html',
  styleUrls: ['./listado-ciclos.component.scss']
})
export class ListadoCiclosComponent implements OnInit {
  ciclos: ModeloDatosTabla[] = [
    {
      numero: 2042,
      creacion: moment('04/15/2025').toDate(), // mm/dd/yyyy
      calculo: moment('04/02/2025').toDate(),
      segmentacion: 'Sin segmentación',
      pensionados: 1000,
      disponibilidad: moment('04/01/2025').toDate(),
      estado: 'Simulación - En proceso',
      estadoTipo: 'info',
      usuarioCreacion: 'fmunozm',
      usuarioModificacion: 'prov_ccn',
      modificacion: '08/04/2025',
      lote: '2-3',
      tipoCiclo: 'Previo',
      ngClassField: {
        fields: [
          {
            fieldName: 'tipoCiclo',
            stylesByValue: {
              Previo: 'warning',
              Definitivo: 'success'
            }
          },
          {
            fieldName: 'estado',
            stylesByValue: {
              'Simulación - En proceso': 'warning',
              Eliminado: 'danger',
              Terminado: 'success'
            }
          }
        ]
      }
    },
    {
      numero: 2041,
      creacion: moment('04/01/2025').toDate(),
      calculo: moment('04/01/2025').toDate(),
      segmentacion: 'Primer pago',
      pensionados: 1000,
      disponibilidad: moment('04/02/2025').toDate(),
      estado: 'Simulación - En proceso',
      estadoTipo: 'info',
      usuarioCreacion: 'fmunozm',
      usuarioModificacion: 'prov_ccn',
      modificacion: '08/04/2025',
      lote: '2-3',
      tipoCiclo: 'Previo',
      ngClassField: {
        fields: [
          {
            fieldName: 'tipoCiclo',
            stylesByValue: {
              Previo: 'warning',
              Definitivo: 'success'
            }
          },
          {
            fieldName: 'estado',
            stylesByValue: {
              'Simulación - En proceso': 'warning',
              Eliminado: 'danger',
              Terminado: 'success'
            }
          }
        ]
      }
    },
    {
      numero: 2038,
      creacion: moment('04/01/2025').toDate(),
      calculo: moment('04/01/2025').toDate(),
      segmentacion: 'Primer pago',
      pensionados: 1000,
      disponibilidad: moment('04/03/2025').toDate(),
      estado: 'Eliminado',
      estadoTipo: 'danger',
      usuarioCreacion: 'fmunozm',
      usuarioModificacion: 'prov_ccn',
      modificacion: '08/04/2025',
      lote: '2-3',
      tipoCiclo: 'Previo',
      ngClassField: {
        fields: [
          {
            fieldName: 'tipoCiclo',
            stylesByValue: {
              Previo: 'warning',
              Definitivo: 'success'
            }
          },
          {
            fieldName: 'estado',
            stylesByValue: {
              'Simulación - En proceso': 'warning',
              Eliminado: 'danger',
              Terminado: 'success'
            }
          }
        ]
      }
    },
    {
      numero: 2038,
      creacion: moment('04/01/2025').toDate(),
      calculo: moment('04/01/2025').toDate(),
      segmentacion: 'Primer pago',
      pensionados: 1000,
      disponibilidad: moment('04/03/2025').toDate(),
      estado: 'Eliminado',
      estadoTipo: 'danger',
      usuarioCreacion: 'fmunozm',
      usuarioModificacion: 'prov_ccn',
      modificacion: '08/04/2025',
      lote: '2-3',
      tipoCiclo: 'Previo',
      ngClassField: {
        fields: [
          {
            fieldName: 'tipoCiclo',
            stylesByValue: {
              Previo: 'warning',
              Definitivo: 'success'
            }
          },
          {
            fieldName: 'estado',
            stylesByValue: {
              'Simulación - En proceso': 'warning',
              Eliminado: 'danger',
              Terminado: 'success'
            }
          }
        ]
      }
    },
    {
      numero: 2038,
      creacion: moment('04/01/2025').toDate(),
      calculo: moment('04/01/2025').toDate(),
      segmentacion: 'Primer pago',
      pensionados: 1000,
      disponibilidad: moment('04/03/2025').toDate(),
      estado: 'Terminado',
      estadoTipo: 'success',
      usuarioCreacion: 'fmunozm',
      usuarioModificacion: 'prov_ccn',
      modificacion: '08/04/2025',
      lote: '2',
      tipoCiclo: 'Definitivo',
      ngClassField: {
        fields: [
          {
            fieldName: 'tipoCiclo',
            stylesByValue: {
              Previo: 'warning',
              Definitivo: 'success'
            }
          },
          {
            fieldName: 'estado',
            stylesByValue: {
              'Simulación - En proceso': 'warning',
              Eliminado: 'danger',
              Terminado: 'success'
            }
          }
        ]
      }
    },
    {
      numero: 2038,
      creacion: moment('04/01/2025').toDate(),
      calculo: moment('04/01/2025').toDate(),
      segmentacion: 'Primer pago',
      pensionados: 1000,
      disponibilidad: moment('04/03/2025').toDate(),
      estado: 'Terminado',
      estadoTipo: 'success',
      usuarioCreacion: 'fmunozm',
      usuarioModificacion: 'prov_ccn',
      modificacion: '08/04/2025',
      lote: '2',
      tipoCiclo: 'Definitivo',
      ngClassField: {
        fields: [
          {
            fieldName: 'tipoCiclo',
            stylesByValue: {
              Previo: 'warning',
              Definitivo: 'success'
            }
          },
          {
            fieldName: 'estado',
            stylesByValue: {
              'Simulación - En proceso': 'warning',
              Eliminado: 'danger',
              Terminado: 'success'
            }
          }
        ]
      }
    },
    {
      numero: 2038,
      creacion: moment('04/01/2025').toDate(),
      calculo: moment('04/01/2025').toDate(),
      segmentacion: 'Primer pago',
      pensionados: 1000,
      disponibilidad: moment('04/03/2025').toDate(),
      estado: 'Terminado',
      estadoTipo: 'success',
      usuarioCreacion: 'fmunozm',
      usuarioModificacion: 'prov_ccn',
      modificacion: '08/04/2025',
      lote: '2',
      tipoCiclo: 'Definitivo',
      ngClassField: {
        fields: [
          {
            fieldName: 'tipoCiclo',
            stylesByValue: {
              Previo: 'warning',
              Definitivo: 'success'
            }
          },
          {
            fieldName: 'estado',
            stylesByValue: {
              'Simulación - En proceso': 'warning',
              Eliminado: 'danger',
              Terminado: 'success'
            }
          }
        ]
      }
    }
  ];
  cols: ModeloColumnas[] = [
    {
      field: 'numero',
      header: 'N° Ciclo',
      hasFilter: true,
      filterType: 'numeric',
      displayType: 'menu'
    },
    {
      field: 'creacion',
      header: 'Fecha de creación',
      hasFilter: true,
      filterType: 'date',
      displayType: 'menu'
    },
    {
      field: 'usuarioCreacion',
      header: 'Usuario de creacion',
      hasFilter: true,
      filterType: 'text',
      displayType: 'menu'
    },
    {
      field: 'lote',
      header: 'Lote',
      hasFilter: true,
      filterType: 'text',
      displayType: 'menu'
    },
    {
      field: 'tipoCiclo',
      header: 'Tipo de ciclo',
      hasFilter: true,
      filterType: 'text',
      displayType: 'menu'
    },
    {
      field: 'segmentacion',
      header: 'Segmentación ciclo de pago',
      hasFilter: true,
      filterType: 'dropdown',
      displayType: 'menu',
      options: [
        { label: 'Todos', value: null },
        { label: 'Sin segmentación', value: 'Sin segmentación' },
        { label: 'Primer pago', value: 'Primer pago' }
      ]
    },
    {
      field: 'pensionados',
      header: 'Pensionados',
      hasFilter: true,
      filterType: 'numeric',
      displayType: 'menu'
    },
    {
      field: 'disponibilidad',
      header: 'Fecha de disponibilidad',
      hasFilter: true,
      filterType: 'date',
      displayType: 'menu'
    },
    {
      field: 'estado',
      header: 'Estado',
      hasFilter: true,
      filterType: 'text',
      displayType: 'menu'
    },
    {
      field: 'acciones',
      header: 'Acciones',
      hasFilter: false,
      actions: [
        {
          actionName: 'ver',
          icon: 'pi pi-eye',
          clickHandler: (data) => {
            this.verCiclo(data);
          }
        },
        {
          actionName: 'eliminar',
          icon: 'pi pi-trash',
          clickHandler: (data) => {
            this.eliminar(data);
          }
        },
        {
          actionName: 'parametros',
          icon: 'pi pi-cog',
          clickHandler: (data) => {
            this.navegarAParametros(data);
          }
        }
      ]
    }
  ];
  propiedadesTabla: PropiedadesTabla = {
    topButtons: [
      {
        title: 'Nuevo Ciclo',
        icon: PrimeIcons.PLUS,
        class: 'p-button-danger',
        type: 'button',
        clickHandler: () => {
          this.navegarANuevoCiclo();
        }
      }
    ],
    tableTitle: 'Listado de Ciclos',
    hasCleanFilterButton: false,
    hasDownloadButton: true
  };

  messages: Message[] | undefined;
  selectedCiclo = null;
  visible = false;
  cicloParaEliminar = null;
  pendingCases = true;
  busqueda = null;
  clear = false;
  deleteDialogVisible = false;

  constructor(
    private readonly router: Router,
    private readonly dataService: DataService
  ) {}

  ngOnInit(): void {
    this.messages = [
      {
        severity: 'warn',
        detail: 'Recuerda que aún existen casos pendientes por procesar.',
        icon: PrimeIcons.INFO_CIRCLE
      }
    ];
  }

  private verCiclo(data) {
    this.selectedCiclo = data;
    this.visible = true;
  }

  private eliminar(data: { numero: any }) {
    this.deleteDialogVisible = true;
    this.cicloParaEliminar = data;
  }

  private navegarAParametros(data) {
    const ruta = ['ciclo-pago-front/simulacion'];
    this.dataService.setDatosSimulacion(data);
    this.router.navigate(ruta).then();
  }

  eliminarCiclo() {
    this.deleteDialogVisible = false;
    return this.ciclos.splice(this.ciclos.indexOf(this.cicloParaEliminar), 1);
  }

  respuestaBusqueda(res: any) {
    console.log('respuestaBusqueda', res);
    this.busqueda = res;
  }

  clearSearch($event: boolean) {
    this.clear = $event;
  }

  navegarANuevoCiclo() {
    const ruta = ['ciclo-pago-front/nuevo-ciclo'];
    this.router.navigate(ruta).then();
  }
}
