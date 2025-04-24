import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { ColsModel } from '@models/modular-table/cols-model';
import moment from 'moment';

@Component({
  selector: 'app-pago-diario',
  templateUrl: './pago-diario.component.html',
  styleUrls: ['./pago-diario.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PagoDiarioComponent implements OnInit {
  messages: Message[] | undefined;
  ciclos = [
    {
      numero: 2042,
      creacion: moment('04/15/2025').toDate(), // mm/dd/yyyy
      calculo: moment('04/02/2025').toDate(),
      segmentacion: 'Sin segmentación',
      pensionados: 1,
      disponibilidad: moment('04/01/2025').toDate(),
      estado: 'Cálculo de Cargos - En Proceso',
      estadoTipo: 'info',
      usuarioCreacion: 'fmunozm',
      usuarioModificacion: 'prov_ccn',
      modificacion: '08/04/2025'
    },
    {
      numero: 2041,
      creacion: moment('04/01/2025').toDate(),
      calculo: moment('04/01/2025').toDate(),
      segmentacion: 'Primer pago',
      pensionados: 3,
      disponibilidad: moment('04/02/2025').toDate(),
      estado: 'Gestión Financiera - En Proceso',
      estadoTipo: 'info',
      usuarioCreacion: 'fmunozm',
      usuarioModificacion: 'prov_ccn',
      modificacion: '08/04/2025'
    },
    {
      numero: 2038,
      creacion: moment('04/01/2025').toDate(),
      calculo: moment('04/01/2025').toDate(),
      segmentacion: 'Primer pago',
      pensionados: 3,
      disponibilidad: moment('04/03/2025').toDate(),
      estado: 'Eliminado',
      estadoTipo: 'danger',
      usuarioCreacion: 'fmunozm',
      usuarioModificacion: 'prov_ccn',
      modificacion: '08/04/2025'
    }
  ];
  cols: ColsModel[] = [
    {
      field: 'numero',
      header: 'N° Ciclo',
      hasFilter: true,
      filterType: 'numeric',
      displayType: 'menu'
    },
    {
      field: 'creacion',
      header: 'Fecha de Creación',
      hasFilter: true,
      filterType: 'date',
      displayType: 'menu'
    },
    {
      field: 'calculo',
      header: 'Fecha de Cálculo',
      hasFilter: true,
      filterType: 'date',
      displayType: 'menu'
    },
    {
      field: 'segmentacion',
      header: 'Segmentación',
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
      header: 'Fecha de Disponibilidad',
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
    },
    {
      field: 'acciones',
      header: 'Acciones',
      hasFilter: false
    }
  ];

  selectedCiclo: any = null;
  visible = false;
  cicloParaEliminar: any = null;
  pendingCases = false;

  constructor(
    private readonly router: Router,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.messages = [
      {
        severity: 'warn',
        detail: 'Recuerda que aún existen casos pendientes por procesar.'
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
        this.showAlerts(removed ? 'success' : 'danger');
      },
      reject: () => {
        this.showAlerts('warn');
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

  async navigateToNuevoCiclo() {
    await this.router.navigate(['ciclo-pago-front', 'nuevo-ciclo']);
  }
}
