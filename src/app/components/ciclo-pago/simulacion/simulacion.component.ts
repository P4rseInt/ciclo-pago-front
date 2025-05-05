import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';
import {
  ModeloColumnas,
  PropiedadesTabla
} from '@models/tabla-general/table-model';
import { HttpClient } from '@angular/common/http';

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
          text: 'Ver log',
          clickHandler: (data) => {
            this.verLog(data);
          }
        }
      ]
    }
  ];
  propiedadesTabla: PropiedadesTabla = {
    topButtons: [
      {
        title: 'Simular',
        icon: '',
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
        clickHandler: () => {
          this.simular();
        }
      }
    ],
    rowSelectionButton: {
      type: 'radio',
      clickHandler: (rowData) => {
        this.simulacionSeleccionada(rowData);
      }
    },
    tableTitle: 'Listado de Simulaciones'
  };

  // Datos para la tabla
  simulaciones: any[] = [];

  constructor(
    private readonly dataService: DataService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.datosCiclo = this.dataService.getDatosSimulacion();
    this.simulaciones = [
      // {
      //   idSimulacion: 1,
      //   usuario: this.datosCiclo.usuarioCreacion,
      //   fechaHora: moment(this.datosCiclo.creacion).toDate(),
      //   porcentajeAvance: '5%',
      //   totalRegistro: '0/0',
      //   omitidos: 0,
      //   pensionadosSinSaldo: 0,
      //   duracion: '00:00:00',
      //   etapa: 'Proceso finalizado',
      //   estadoSimulacion: this.datosCiclo.estado,
      //   ngClassField: {
      //     fields: [
      //       {
      //         fieldName: 'estadoSimulacion',
      //         stylesByValue: {
      //           'Simulación - En proceso': 'warning'
      //         }
      //       }
      //     ]
      //   }
      // }
    ];
  }

  simular() {
    console.log('simular');
  }

  simulacionSeleccionada(rowData) {
    console.log('rowData', rowData);
  }

  getDatosSimulacion() {
    return this.simulaciones;
  }

  verChecklist() {}

  verParametros() {}

  private verLog(data) {
    console.log('verLog', data);
  }
}
