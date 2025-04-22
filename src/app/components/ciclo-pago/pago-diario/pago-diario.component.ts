import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { ColsModel } from '@models/modular-table/cols-model';

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
      creacion: new Date(22, 3, 2025),
      calculo: '25/03/2025',
      segmentacion: 'Sin segmentación',
      pensionados: 1,
      disponibilidad: '28/03/2025',
      estado: 'Cálculo de Cargos - En Proceso',
      estadoTipo: 'info',
      usuarioCreacion: 'fmunozm',
      usuarioModificacion: 'prov_ccn',
      modificacion: '08/04/2025'
    },
    {
      numero: 2041,
      creacion: '19/03/2025',
      calculo: '19/03/2025',
      segmentacion: 'Primer pago',
      pensionados: 3,
      disponibilidad: '24/03/2025',
      estado: 'Gestión Financiera - En Proceso',
      estadoTipo: 'info',
      usuarioCreacion: 'fmunozm',
      usuarioModificacion: 'prov_ccn',
      modificacion: '08/04/2025'
    },
    {
      numero: 2038,
      creacion: '14/03/2025',
      calculo: '14/03/2025',
      segmentacion: 'Primer pago',
      pensionados: 3,
      disponibilidad: '19/03/2025',
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
      hasFilter: true,
      filterType: 'date',
      header: 'Fecha de Creación',
      field: 'creacion',
      displayType: 'menu'
    },
    {
      hasFilter: true,
      filterType: 'date',
      header: 'Fecha de Cálculo',
      field: 'calculo',
      displayType: 'menu'
    },
    {
      field: 'segmentacion',
      hasFilter: true,
      filterType: 'dropdown',
      header: 'Segmentación',
      displayType: 'menu',
      options: [
        { label: 'Todos', value: null },
        { label: 'Sin segmentación', value: 'Sin segmentación' },
        { label: 'Primer pago', value: 'Primer pago' }
      ]
    },
    {
      field: 'pensionados',
      hasFilter: true,
      filterType: 'numeric',
      header: 'Pensionados',
      displayType: 'menu'
    },
    {
      field: 'disponibilidad',
      hasFilter: true,
      filterType: 'date',
      header: 'Fecha de Disponibilidad',
      displayType: 'menu'
    },
    {
      field: 'estado',
      hasFilter: true,
      filterType: 'text',
      header: 'Estado',
      displayType: 'menu'
    },
    {
      field: 'acciones',
      hasFilter: false,
      header: 'Acciones',
      actions: [
        {
          actionName: 'Ver'
        },
        {
          actionName: 'Eliminar'
        },
        {
          actionName: 'Parametros'
        }
      ]
    }
  ];

  selectedCiclo: any = null;
  visible = false;
  cicloParaEliminar: any = null;
  pendingCases = false;

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
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
