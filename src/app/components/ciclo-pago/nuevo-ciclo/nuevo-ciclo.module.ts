import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevoCicloComponent } from '@components/ciclo-pago/nuevo-ciclo/nuevo-ciclo.component';
import { NuevoCicloRoutingModule } from '@components/ciclo-pago/nuevo-ciclo/nuevo-ciclo-routing.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TableComponent } from '@shared/table/table.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { UfPipe } from '@shared/pipe/uf.pipe';
import { MoneyPipe } from '@shared/pipe/money.pipe';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ClickOutsideDirective } from '../../../directives/click-outside.directive';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { StepsModule } from 'primeng/steps';
import { ParametrosModule } from '@components/ciclo-pago/parametros/parametros.module';
import { ValorNumberPipe } from '../../../pipes/valor-number.pipe';
import { SegmentacionModule } from '@components/ciclo-pago/segmentacion/segmentacion.module';
import { UniversoPagoModule } from '@components/ciclo-pago/universo-pago/universo-pago.module';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from '@shared/stepper/stepper.module';

@NgModule({
  declarations: [NuevoCicloComponent, TableComponent, ClickOutsideDirective],
  imports: [
    CommonModule,
    NuevoCicloRoutingModule,
    MatStepperModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTableModule,
    FormsModule,
    MatButtonModule,
    MatChipsModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatDatepickerModule,
    CardModule,
    DividerModule,
    ProgressSpinnerModule,
    StepsModule,
    ValorNumberPipe,
    UfPipe,
    MoneyPipe,
    ParametrosModule,
    SegmentacionModule,
    UniversoPagoModule,
    ButtonModule,
    StepperModule
  ],
  exports: [NuevoCicloComponent, ClickOutsideDirective, TableComponent]
})
export class NuevoCicloModule {}
