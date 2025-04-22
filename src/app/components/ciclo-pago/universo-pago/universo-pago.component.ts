import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-universo-pago',
  templateUrl: './universo-pago.component.html',
  styleUrls: ['./universo-pago.component.scss']
})
export class UniversoPagoComponent implements OnInit {
  resumenBeneficios = [
    {
      tipo: 'Vejez Edad',
      modalidad: 'Retiro Programado',
      beneficios: 5357,
      pensionados: 5357
    },
    {
      tipo: 'Vejez Edad',
      modalidad: 'Renta Temporal',
      beneficios: 4424,
      pensionados: 4424
    },
    {
      tipo: 'Vejez Anticipada',
      modalidad: 'Retiro Programado',
      beneficios: 7938,
      pensionados: 7938
    },
    {
      tipo: 'Vejez Anticipada',
      modalidad: 'Renta Temporal',
      beneficios: 32155,
      pensionados: 32155
    },
    {
      tipo: 'Invalidez Transitoria',
      modalidad: 'Retiro Programado',
      beneficios: 3430,
      pensionados: 3430
    },
    {
      tipo: 'Invalidez Transitoria',
      modalidad: 'Cubierto por el Seguro',
      beneficios: 10409,
      pensionados: 10409
    }
  ];
  casosExcluidos: any[] = [];

  constructor() {}

  ngOnInit(): void {}
}
