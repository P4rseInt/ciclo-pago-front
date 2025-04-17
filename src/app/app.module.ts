import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CicloPagoModule } from '@components/ciclo-pago/ciclo-pago.module';
import { StepperComponent } from './shared/stepper/stepper.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ParametrosModule } from '@components/ciclo-pago/parametros/parametros.module';
import { SegmentacionModule } from '@components/ciclo-pago/segmentacion/segmentacion.module';
import { StepsModule } from 'primeng/steps';
import { UniversoPagoModule } from '@components/ciclo-pago/universo-pago/universo-pago.module';
import { StepperModule } from '@shared/stepper/stepper.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CicloPagoModule,
    ButtonModule,
    CardModule,
    DividerModule,
    ParametrosModule,
    SegmentacionModule,
    StepsModule,
    UniversoPagoModule,
    StepperModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule {}
