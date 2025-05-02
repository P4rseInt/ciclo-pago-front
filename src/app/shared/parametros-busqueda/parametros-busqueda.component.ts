import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-parametros-busqueda',
  templateUrl: './parametros-busqueda.component.html',
  styleUrls: ['./parametros-busqueda.component.scss']
})
export class ParametrosBusquedaComponent implements OnInit, OnChanges {
  formBusqueda!: FormGroup;
  @Output() respuestaBusqueda: EventEmitter<any> = new EventEmitter();
  @Input() clearInputs = false;

  constructor() {}

  ngOnInit(): void {
    this.formBusqueda = new FormGroup({
      creacion: new FormControl(null),
      numero: new FormControl(),
      usuarioCreacion: new FormControl()
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clear'] && this.clearInputs) {
      this.clearSearch();
    }
  }

  clearSearch(): void {
    console.log('clear', this.clearInputs);
    if (this.clearInputs)
      this.formBusqueda.setValue({
        creacion: null,
        numero: '',
        usuarioCreacion: ''
      });
  }

  onSubmit() {
    const valores: ResBusquedaModelo = this.formBusqueda.value;
    this.respuestaBusqueda.emit(
      this.cleanEmptyValues({
        ...valores,
        creacion: this.formatToLocalDate(valores.creacion) as string[]
      })
    );
  }

  formatToLocalDate(fechas: string[]) {
    if (fechas === null || fechas === undefined) {
      return '';
    }
    return fechas.map((fecha) => {
      return moment(fecha).format('DD-MM-YYYY');
    });
  }

  cleanEmptyValues(valores: ResBusquedaModelo) {
    return Object.entries(valores)
      .filter(([value]) => value !== '')
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as Partial<ResBusquedaModelo>);
  }
}

export interface ResBusquedaModelo {
  creacion: string[];
  numero: string;
  usuarioCreacion: string;
}
