import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-parametros-busqueda',
  templateUrl: './parametros-busqueda.component.html',
  styleUrls: ['./parametros-busqueda.component.scss']
})
export class ParametrosBusquedaComponent implements OnInit {
  formBusqueda!: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.formBusqueda = this.fb.group({
      periodo: [null],
      numeroCiclo: [''],
      usuario: ['']
    });
  }

  onSubmit() {
    if (this.formBusqueda.valid) {
      const valores = this.formBusqueda.value;
      console.log('Valores del formulario:', valores);
      // Aquí puedes disparar búsqueda, emitir evento, etc.
    }
  }
}
