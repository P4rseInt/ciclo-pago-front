import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckboxChangeEvent } from 'primeng/checkbox';

@Component({
  selector: 'app-segmentacion',
  templateUrl: './segmentacion.component.html',
  styleUrls: ['./segmentacion.component.scss']
})
export class SegmentacionComponent implements OnInit {
  form: FormGroup;
  lotes: any[];
  tiposSegmentacionesList: any[];
  arr = [];

  constructor() {}

  ngOnInit(): void {
    this.lotes = [
      {
        nombre: 'Lote 1',
        apellidos: 'Sin Segmentación',
        tipo: 'PGU',
        casos: '124.503',
        selected: false
      },
      {
        nombre: 'Lote 2',
        apellidos: 'A - L',
        tipo: 'Sin Segmentación',
        casos: '48.520',
        selected: false
      },
      {
        nombre: 'Lote 3',
        apellidos: 'M - Z',
        tipo: 'Sin Segmentación',
        casos: '54.326',
        selected: false
      }
    ];
    this.tiposSegmentacionesList = [
      { tipo: 'Sin Segmentación', value: 'sin-segmentacion' },
      { tipo: 'Por Apellidos', value: 'apellidos' },
      { tipo: 'Por Financiamiento', value: 'financiamiento' }
    ];

    this.form = new FormGroup({
      tiposSegmentaciones: new FormControl(this.tiposSegmentacionesList[0]),
      lotes: new FormControl(null)
    });
  }

  getCheckboxSelection(event: CheckboxChangeEvent): void {
    console.log('event', event.checked);
  }
}
