import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CicloPagoComponent } from '@components/ciclo-pago/ciclo-pago.component';
import { PagoDiarioModule } from '@components/ciclo-pago/pago-diario/pago-diario.module';
import { CicloPagoRoutingModule } from '@components/ciclo-pago/ciclo-pago-routing.module';
import { NuevoCicloModule } from '@components/ciclo-pago/nuevo-ciclo/nuevo-ciclo.module';

@NgModule({
  declarations: [CicloPagoComponent],
  imports: [
    CommonModule,
    CicloPagoRoutingModule,
    PagoDiarioModule,
    NuevoCicloModule
  ],
  exports: [CicloPagoComponent]
})
export class CicloPagoModule {}
