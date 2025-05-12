import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversoPagoComponent } from '@components/ciclo-pago/universo-pago/universo-pago.component';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [UniversoPagoComponent, MockDividerComponent],
  imports: [
    CommonModule,
    CardModule,
    DividerModule,
    TableModule,
    ButtonModule,
    TagModule,
    AccordionModule,
    InputTextModule
  ],
  exports: [UniversoPagoComponent]
})
export class UniversoPagoModule {}
