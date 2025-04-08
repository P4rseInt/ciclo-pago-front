import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevoCicloComponent } from '@components/ciclo-pago/nuevo-ciclo/nuevo-ciclo.component';
import { NuevoCicloRoutingModule } from '@components/ciclo-pago/nuevo-ciclo/nuevo-ciclo-routing.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ValorNumberPipe } from '../../../pipes/valor-number.pipe';
import { ValorNumberTramoPipe } from '../../../pipes/valor-number-tramos.pipe';
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

@NgModule({
  declarations: [
    NuevoCicloComponent,
    ValorNumberPipe,
    ValorNumberTramoPipe,
    TableComponent,
    UfPipe,
    MoneyPipe,
    ClickOutsideDirective
  ],
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
    MatDatepickerModule
  ],
  exports: [NuevoCicloComponent, ClickOutsideDirective]
})
export class NuevoCicloModule {}
