import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.scss']
})
export class ParametrosComponent implements OnInit {
  asignacionFamiliar = [
    { rango: 1, desde: '$ 0', hasta: '$ 586.227', monto: '$ 21.243' },
    { rango: 2, desde: '$ 586.228', hasta: '$ 856.247', monto: '$ 13.036' },
    { rango: 3, desde: '$ 856.248', hasta: '$ 1.335.450', monto: '$ 4.119' },
    { rango: 4, desde: '$ 1.335.451', hasta: '$ 9.999.999', monto: '$ 0' }
  ];
  bonificacionesEdad = [
    {
      categoria: 'Menor de 70 sin Hijos',
      conyuge: '$ 76.278,39',
      madre: '$ 45.767,03'
    },
    {
      categoria: 'Menor de 70 con Hijos',
      conyuge: '$ 66.743,58',
      madre: '$ 40.046,15'
    },
    {
      categoria: 'Entre 70 y 75 sin Hijos',
      conyuge: '$ 83.404,56',
      madre: '$ 50.042,74'
    },
    {
      categoria: 'Entre 70 y 75 con Hijos',
      conyuge: '$ 72.978,99',
      madre: '$ 43.787,40'
    },
    {
      categoria: 'Mayor/Igual 75 sin Hijos',
      conyuge: '$ 88.989,85',
      madre: '$ 53.393,91'
    },
    {
      categoria: 'Mayor/Igual 75 con Hijos',
      conyuge: '$ 77.866,12',
      madre: '$ 46.719,67'
    }
  ];
  tramosImpuestos = [
    { tramo: 1, desde: '$ 0', hasta: '$ 922.131', rebaja: '$ 0', factor: '0' },
    {
      tramo: 2,
      desde: '$ 922.131,01',
      hasta: '$ 2.049.180',
      rebaja: '$ 36.885,24',
      factor: '0.04'
    },
    {
      tramo: 3,
      desde: '$ 2.049.180,01',
      hasta: '$ 3.415.300',
      rebaja: '$ 118.852,44',
      factor: '0.08'
    },
    {
      tramo: 4,
      desde: '$ 3.415.300,01',
      hasta: '$ 4.781.420',
      rebaja: '$ 306.693,94',
      factor: '0.135'
    },
    {
      tramo: 5,
      desde: '$ 4.781.420,01',
      hasta: '$ 6.147.540',
      rebaja: '$ 760.928,84',
      factor: '0.23'
    },
    {
      tramo: 6,
      desde: '$ 6.147.540,01',
      hasta: '$ 8.196.720',
      rebaja: '$ 1.215.846,80',
      factor: '0.304'
    },
    {
      tramo: 7,
      desde: '$ 8.196.720,01',
      hasta: '$ 21.174.860',
      rebaja: '$ 1.592.895,92',
      factor: '0.35'
    },
    {
      tramo: 8,
      desde: '$ 21.174.860,01',
      hasta: 'Y más',
      rebaja: '$ 2.651.638,92',
      factor: '0.4'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('Componente parametros');
  }
}
