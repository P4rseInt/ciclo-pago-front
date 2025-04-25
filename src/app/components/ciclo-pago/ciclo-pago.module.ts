import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CicloPagoRoutingModule } from '@components/ciclo-pago/ciclo-pago-routing.module';
import { NuevoCicloModule } from '@components/ciclo-pago/nuevo-ciclo/nuevo-ciclo.module';
import { ParametrosModule } from '@components/ciclo-pago/parametros/parametros.module';
import { UniversoPagoModule } from '@components/ciclo-pago/universo-pago/universo-pago.module';
import { SegmentacionModule } from '@components/ciclo-pago/segmentacion/segmentacion.module';
import { CicloPagoComponent } from '@components/ciclo-pago/ciclo-pago.component';
import { ListadoCiclosModule } from '@components/ciclo-pago/listado-ciclos/listado-ciclos.module';
import { SimulacionModule } from '@components/ciclo-pago/simulacion/simulacion.module';

@NgModule({
  declarations: [CicloPagoComponent],
  imports: [
    ListadoCiclosModule,
    NuevoCicloModule,
    ParametrosModule,
    SegmentacionModule,
    UniversoPagoModule,
    SimulacionModule,
    CommonModule,
    CicloPagoRoutingModule
  ],
  exports: [CicloPagoComponent]
})
export class CicloPagoModule {}
