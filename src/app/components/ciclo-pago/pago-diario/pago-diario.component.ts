import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-pago-diario',
  templateUrl: './pago-diario.component.html',
  styleUrls: ['./pago-diario.component.scss']
})
export class PagoDiarioComponent implements OnInit {
  @ViewChild('dtTable') table!: Table;
  messages: Message[] | undefined;

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

  ciclos = [
    {
      numero: 2042,
      creacion: '25/03/2025',
      calculo: null,
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
      calculo: null,
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
  segmentacionOptions = [
    { label: 'Todos', value: null },
    { label: 'Sin segmentación', value: 'Sin segmentación' },
    { label: 'Primer pago', value: 'Primer pago' }
  ];
  selectedCiclo: any = null;
  visible = false;
  cicloParaEliminar: any = null;

  getEstadoClass(tipo: string): string {
    switch (tipo) {
      case 'info':
        return 'bg-blue-100 text-blue-800';
      case 'danger':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  verCiclo(ciclo: any) {
    this.selectedCiclo = ciclo;
    this.visible = true;
  }

  handleDelete(ciclo: any) {
    this.cicloParaEliminar = ciclo;
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar el ciclo N° ${ciclo.numero}?`,
      header: 'Eliminar Ciclo',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      accept: async () => {
        await this.eliminarCiclo();
        window.location.reload();
        window.location.href = window.location.href + '/';
      },
      reject: () => {
        console.log('Eliminación cancelada');
        window.location.reload();
        window.location.href = window.location.href + '/';
      }
    });
  }

  async eliminarCiclo(): Promise<void> {
    console.log('Se elimina el ciclo');
    // this.ciclos = this.ciclos.filter(
    //   (c) => c.numero !== this.cicloParaEliminar.numero
    // );
  }

  async navigateToNuevoCiclo() {
    await this.router.navigate(['ciclo-pago-front', 'nuevo-ciclo']);
  }

  onGlobalFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.table.filterGlobal(value, 'contains');
  }
}
