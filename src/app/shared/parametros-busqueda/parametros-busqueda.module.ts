import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametrosBusquedaComponent } from '@shared/parametros-busqueda/parametros-busqueda.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [ParametrosBusquedaComponent],
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    InputTextModule,
    ReactiveFormsModule,
    CardModule
  ],
  exports: [ParametrosBusquedaComponent]
})
export class ParametrosBusquedaModule {}
