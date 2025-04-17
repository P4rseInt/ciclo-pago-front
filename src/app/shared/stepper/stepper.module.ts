import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent } from '@shared/stepper/stepper.component';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { SegmentacionModule } from '@components/ciclo-pago/segmentacion/segmentacion.module';
import { ParametrosModule } from '@components/ciclo-pago/parametros/parametros.module';
import { UniversoPagoModule } from '@components/ciclo-pago/universo-pago/universo-pago.module';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [StepperComponent],
  imports: [
    CommonModule,
    StepsModule,
    CardModule,
    SegmentacionModule,
    ParametrosModule,
    UniversoPagoModule,
    DividerModule,
    ButtonModule
  ],
  exports: [StepperComponent]
})
export class StepperModule {}
