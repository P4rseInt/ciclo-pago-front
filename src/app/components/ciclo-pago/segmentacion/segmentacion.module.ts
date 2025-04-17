import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SegmentacionComponent } from '@components/ciclo-pago/segmentacion/segmentacion.component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  declarations: [SegmentacionComponent],
  imports: [
    CommonModule,
    CardModule,
    FormsModule,
    CheckboxModule,
    TagModule,
    DividerModule,
    DropdownModule,
    ButtonModule,
    ReactiveFormsModule,
    RadioButtonModule
  ],
  exports: [SegmentacionComponent]
})
export class SegmentacionModule {}
