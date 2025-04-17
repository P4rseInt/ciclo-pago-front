import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagoDiarioModule } from '@components/ciclo-pago/pago-diario/pago-diario.module';
import { CicloPagoRoutingModule } from '@components/ciclo-pago/ciclo-pago-routing.module';
import { NuevoCicloModule } from '@components/ciclo-pago/nuevo-ciclo/nuevo-ciclo.module';
import { CardModule } from 'primeng/card';
import { MatCardModule } from '@angular/material/card';
import { DividerModule } from 'primeng/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { ParametrosModule } from '@components/ciclo-pago/parametros/parametros.module';
import { UniversoPagoModule } from '@components/ciclo-pago/universo-pago/universo-pago.module';
import { SegmentacionModule } from '@components/ciclo-pago/segmentacion/segmentacion.module';
import { CicloPagoComponent } from '@components/ciclo-pago/ciclo-pago.component';

@NgModule({
  declarations: [CicloPagoComponent],
  imports: [
    CommonModule,
    CicloPagoRoutingModule,
    PagoDiarioModule,
    ParametrosModule,
    SegmentacionModule,
    UniversoPagoModule,
    NuevoCicloModule,
    CardModule,
    MatCardModule,
    DividerModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule
  ],
  exports: [CicloPagoComponent]
})
export class CicloPagoModule {}
