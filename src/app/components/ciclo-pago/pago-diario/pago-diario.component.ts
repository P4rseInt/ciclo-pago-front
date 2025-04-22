import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pago-diario',
  templateUrl: './pago-diario.component.html',
  styleUrls: ['./pago-diario.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PagoDiarioComponent implements OnInit {
  @ViewChild('dtTable') table!: Table;

  messages: Message[] | undefined;
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
  pendingCases = false;
  creacionControl = new FormControl(null);
  calculoControl = new FormControl(null);
  disponibilidadControl = new FormControl(null);

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
        setTimeout(() => {
          this.reloadPage();
        }, 2000);
        this.showAlerts(removed ? 'success' : 'danger');
      },
      reject: () => {
        setTimeout(() => {
          this.reloadPage();
        }, 2000);
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

  onGlobalFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.table.filterGlobal(value, 'contains');
  }

  reloadPage() {
    window.location.reload();
    window.location.href = window.location.href + '/';
  }

  clear(dtTable: Table) {
    dtTable.clear();
  }
}
