import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulacionComponent } from '@components/ciclo-pago/simulacion/simulacion.component';

@NgModule({
  declarations: [SimulacionComponent],
  imports: [CommonModule],
  exports: [SimulacionComponent]
})
export class SimulacionModule {}
