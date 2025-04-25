import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevoCicloComponent } from '@components/ciclo-pago/nuevo-ciclo/nuevo-ciclo.component';
import { NuevoCicloRoutingModule } from '@components/ciclo-pago/nuevo-ciclo/nuevo-ciclo-routing.module';
import { ClickOutsideDirective } from '../../../directives/click-outside.directive';
import { SpinnerModule } from '@shared/spinner/spinner.module';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ParametrosModule } from '@components/ciclo-pago/parametros/parametros.module';
import { SegmentacionModule } from '@components/ciclo-pago/segmentacion/segmentacion.module';
import { StepsModule } from 'primeng/steps';
import { UniversoPagoModule } from '@components/ciclo-pago/universo-pago/universo-pago.module';

@NgModule({
  declarations: [NuevoCicloComponent, ClickOutsideDirective],
  imports: [
    CommonModule,
    NuevoCicloRoutingModule,
    SpinnerModule,
    ButtonModule,
    CardModule,
    DividerModule,
    ParametrosModule,
    SegmentacionModule,
    StepsModule,
    UniversoPagoModule
  ],
  exports: [NuevoCicloComponent, ClickOutsideDirective]
})
export class NuevoCicloModule {}
