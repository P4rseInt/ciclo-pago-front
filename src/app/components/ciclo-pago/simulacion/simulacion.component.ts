import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';
import { MenuItem, PrimeIcons } from 'primeng/api';
import {
  ModeloColumnas,
  TablaCaracteristicas
} from '@models/tabla-general/cols-model';
import moment from 'moment';

@Component({
  selector: 'app-simulacion',
  templateUrl: './simulacion.component.html',
  styleUrls: ['./simulacion.component.scss']
})
export class SimulacionComponent implements OnInit {
  datosCiclo = null;
  colsTablaSimulacion: ModeloColumnas[] = [
    {
      field: 'idSimulacion',
      header: 'ID Simulación',
      hasFilter: true,
      displayType: 'menu',
      filterType: 'numeric'
    },
    {
      field: 'usuario',
      header: 'Usuario',
      hasFilter: true,
      displayType: 'menu',
      filterType: 'text'
    },
    {
      field: 'fechaHora',
      header: 'Fecha y Hora',
      hasFilter: true,
      displayType: 'menu',
      filterType: 'date'
    },
    {
      field: 'porcentajeAvance',
      header: '% Avance',
      hasFilter: true,
      displayType: 'menu',
      filterType: 'text'
    },
    {
      field: 'totalRegistro',
      header: 'N° Total Registro',
      hasFilter: true,
      displayType: 'menu',
      filterType: 'numeric'
    },
    {
      field: 'omitidos',
      header: 'Omitidos',
      hasFilter: true,
      displayType: 'menu',
      filterType: 'numeric'
    },
    {
      field: 'pensionadosSinSaldo',
      header: 'Pensionados sin saldo',
      hasFilter: true,
      displayType: 'menu',
      filterType: 'numeric'
    },
    {
      field: 'duracion',
      header: 'Duración',
      hasFilter: true,
      displayType: 'menu',
      filterType: 'text'
    },
    {
      field: 'etapa',
      header: 'Etapa',
      hasFilter: true,
      displayType: 'menu',
      filterType: 'text'
    },
    {
      field: 'estadoSimulacion',
      header: 'Estado Simulación',
      hasFilter: true,
      displayType: 'menu',
      filterType: 'text'
    },
    {
      field: 'acciones',
      header: 'Acciones',
      hasFilter: false,
      actions: [
        {
          actionName: 'button',
          text: 'Ver log'
        }
      ]
    }
  ];
  caracteristicasTabla: TablaCaracteristicas = {
    hasCleanFilter: false,
    topButton: {
      titulo: 'Simular',
      icono: '',
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
        this.simular();
      }
    },
    rowSelectionButton: {
      type: 'radio',
      action: (rowData) => {
        this.simulacionSeleccionada(rowData);
      }
    },
    tableTitle: 'Listado de Simulaciones'
  };

  // Datos para la tabla
  simulaciones: any[] = [];

  constructor(private readonly dataService: DataService) {}

  ngOnInit() {
    this.datosCiclo = this.dataService.getDatosSimulacion();
    this.simulaciones = [
      {
        idSimulacion: 1,
        usuario: this.datosCiclo.usuarioCreacion,
        fechaHora: moment(this.datosCiclo.creacion).toDate(),
        porcentajeAvance: '5%',
        totalRegistro: '0/0',
        omitidos: 0,
        pensionadosSinSaldo: 0,
        duracion: '00:00:00',
        etapa: 'Proceso finalizado',
        estadoSimulacion: this.datosCiclo.estado,
        ngClassField: {
          fields: [
            {
              fieldName: 'estadoSimulacion',
              stylesByValue: {
                'Simulación - En proceso': 'bg-yellow-100 text-yellow-800'
              }
            }
          ]
        }
      }
    ];
  }

  simular() {
    console.log('simular');
  }

  simulacionSeleccionada(rowData) {
    console.log('rowData', rowData);
  }

  showDatosSimulacion() {
    return this.simulaciones;
  }
}
