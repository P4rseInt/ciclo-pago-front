import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-parametros-busqueda',
  templateUrl: './parametros-busqueda.component.html',
  styleUrls: ['./parametros-busqueda.component.scss']
})
export class ParametrosBusquedaComponent implements OnInit, OnChanges {
  formBusqueda!: FormGroup;
  @Output() respuestaBusqueda: EventEmitter<any> = new EventEmitter();
  @Input() clear;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.formBusqueda = this.fb.group({
      creacion: [null],
      numero: [''],
      usuarioCreacion: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clear'] && this.clear) {
      this.clearSearch();
    }
  }

  clearSearch(): void {
    console.log('clear', this.clear);
    if (this.clear)
      this.formBusqueda.setValue({
        creacion: null,
        numero: '',
        usuarioCreacion: ''
      });
  }

  onSubmit() {
    const valores: ResBusquedaModelo = this.formBusqueda.value;
    if (valores.creacion) {
      this.formatToLocalDate(valores);
    }
    this.respuestaBusqueda.emit(this.cleanEmptyValues(valores));
  }

  formatToLocalDate(valores: ResBusquedaModelo) {
    return moment(valores.creacion).format('DD-MM-YYYY');
  }

  cleanEmptyValues(valores: ResBusquedaModelo) {
    return Object.entries(valores)
      .filter(([_, value]) => value !== '')
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as Partial<ResBusquedaModelo>);
  }
}

export interface ResBusquedaModelo {
  creacion: string;
  numero: string;
  usuarioCreacion: string;
}
