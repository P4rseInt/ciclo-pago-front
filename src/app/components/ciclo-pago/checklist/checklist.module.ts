import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChecklistComponent } from '@components/ciclo-pago/checklist/checklist.component';

@NgModule({
  declarations: [ChecklistComponent],
  imports: [CommonModule],
  exports: [ChecklistComponent]
})
export class ChecklistModule {}
