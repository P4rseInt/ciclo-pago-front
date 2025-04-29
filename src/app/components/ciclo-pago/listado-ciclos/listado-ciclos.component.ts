import { Component, OnInit } from '@angular/core';
import {
  ConfirmationService,
  Message,
  MessageService,
  PrimeIcons
} from 'primeng/api';
import moment from 'moment/moment';
import {
  ModeloColumnas,
  ModeloDataTabla
} from '@models/tabla-general/cols-model';
import { Router } from '@angular/router';
import { DataService } from '@services/data.service';
import { Boton } from '@models/tabla-general/boton-model';

@Component({
  selector: 'app-listado-ciclos',
  templateUrl: './listado-ciclos.component.html',
  styleUrls: ['./listado-ciclos.component.scss']
})
export class ListadoCiclosComponent implements OnInit {
  messages: Message[] | undefined;
  ciclos: ModeloDataTabla[] = [
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
              Previo: 'bg-yellow-100 text-yellow-800',
              Definitivo: 'bg-green-100 text-green-800'
            }
          },
          {
            fieldName: 'estado',
            stylesByValue: {
              'Simulación - En proceso': 'bg-yellow-100 text-yellow-800',
              Eliminado: 'bg-red-100 text-red-800',
              Terminado: 'bg-green-100 text-green-800'
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
              Previo: 'bg-yellow-100 text-yellow-800',
              Definitivo: 'bg-green-100 text-green-800'
            }
          },
          {
            fieldName: 'estado',
            stylesByValue: {
              'Simulación - En proceso': 'bg-yellow-100 text-yellow-800',
              Eliminado: 'bg-red-100 text-red-800',
              Terminado: 'bg-green-100 text-green-800'
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
              Previo: 'bg-yellow-100 text-yellow-800',
              Definitivo: 'bg-green-100 text-green-800'
            }
          },
          {
            fieldName: 'estado',
            stylesByValue: {
              'Simulación - En proceso': 'bg-yellow-100 text-yellow-800',
              Eliminado: 'bg-red-100 text-red-800',
              Terminado: 'bg-green-100 text-green-800'
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
              Previo: 'bg-yellow-100 text-yellow-800',
              Definitivo: 'bg-green-100 text-green-800'
            }
          },
          {
            fieldName: 'estado',
            stylesByValue: {
              'Simulación - En proceso': 'bg-yellow-100 text-yellow-800',
              Eliminado: 'bg-red-100 text-red-800',
              Terminado: 'bg-green-100 text-green-800'
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
              Previo: 'bg-yellow-100 text-yellow-800',
              Definitivo: 'bg-green-100 text-green-800'
            }
          },
          {
            fieldName: 'estado',
            stylesByValue: {
              'Simulación - En proceso': 'bg-yellow-100 text-yellow-800',
              Eliminado: 'bg-red-100 text-red-800',
              Terminado: 'bg-green-100 text-green-800'
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
              Previo: 'bg-yellow-100 text-yellow-800',
              Definitivo: 'bg-green-100 text-green-800'
            }
          },
          {
            fieldName: 'estado',
            stylesByValue: {
              'Simulación - En proceso': 'bg-yellow-100 text-yellow-800',
              Eliminado: 'bg-red-100 text-red-800',
              Terminado: 'bg-green-100 text-green-800'
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
              Previo: 'bg-yellow-100 text-yellow-800',
              Definitivo: 'bg-green-100 text-green-800'
            }
          },
          {
            fieldName: 'estado',
            stylesByValue: {
              'Simulación - En proceso': 'bg-yellow-100 text-yellow-800',
              Eliminado: 'bg-red-100 text-red-800',
              Terminado: 'bg-green-100 text-green-800'
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
        { actionName: 'ver' },
        { actionName: 'eliminar' },
        { actionName: 'parametros' },
        { actionName: 'download' }
      ]
    }
  ];

  selectedCiclo = null;
  visible = false;
  cicloParaEliminar = null;
  pendingCases = true;
  busqueda = null;
  clear = false;
  boton: Boton = {
    titulo: 'Nuevo Ciclo',
    icono: PrimeIcons.PLUS,
    class: 'p-button-danger',
    type: 'button',
    styles: [
      `padding: 10px 20px !important;  background-color: #da1547 !important;  color: white !important;
          border: none !important;
          border-radius: 50px !important;
          font-weight: bold !important;
          cursor: pointer !important;
    }
    .p-button-danger:hover {
          background-color: #b4123b !important;
    }
    .p-button-danger:active {
         background-color: #810c2a !important;`
    ],
    action: () => {
      this.navegarANuevoCiclo();
    }
  };

  constructor(
    private readonly router: Router,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
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

  verCiclo(ciclo: any) {
    this.selectedCiclo = ciclo;
    this.visible = true;
  }

  handleDelete(ciclo: { numero: any }) {
    this.cicloParaEliminar = ciclo;
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar el ciclo N° ${ciclo.numero}?`,
      header: 'Eliminar Ciclo',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      accept: () => {
        const removed = this.eliminarCiclo();
        //  this.showAlerts(removed ? 'success' : 'danger');
      },
      reject: () => {
        //   this.showAlerts('warn');
      }
    });
  }

  eliminarCiclo() {
    return this.ciclos.splice(this.ciclos.indexOf(this.cicloParaEliminar), 1);
  }

  showAlerts(severity: string) {
    const msg = {
      success: {
        severity: 'success',
        summary: 'Éxito',
        detail: `Ciclo N°${this.cicloParaEliminar.numero} eliminado correctamente`
      },
      warn: {
        severity: 'warn',
        summary: 'Cancelado',
        detail: 'Se canceló la operación'
      }
    };
    this.messageService.add(msg[severity]);
  }

  respuestaBusqueda(res: any) {
    console.log('respuestaBusqueda', res);
    this.busqueda = res;
  }

  clearSearch($event: boolean) {
    this.clear = $event;
  }

  navegarANuevoCiclo() {
    this.router.navigate(['ciclo-pago-front', 'nuevo-ciclo']).then();
  }

  async navegarASimulacion(rowData: any) {
    this.dataService.setDatosSimulacion(rowData);
    await this.router.navigate(['ciclo-pago-front', 'simulacion']);
  }
}
