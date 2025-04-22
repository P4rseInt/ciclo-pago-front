import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevoCicloComponent } from '@components/ciclo-pago/nuevo-ciclo/nuevo-ciclo.component';
import { NuevoCicloRoutingModule } from '@components/ciclo-pago/nuevo-ciclo/nuevo-ciclo-routing.module';
import { ClickOutsideDirective } from '../../../directives/click-outside.directive';
import { StepperModule } from '@shared/stepper/stepper.module';
import { SpinnerModule } from '@shared/spinner/spinner.module';

@NgModule({
  declarations: [NuevoCicloComponent, ClickOutsideDirective],
  imports: [
    CommonModule,
    NuevoCicloRoutingModule,
    StepperModule,
    SpinnerModule
  ],
  exports: [NuevoCicloComponent, ClickOutsideDirective]
})
export class NuevoCicloModule {}
