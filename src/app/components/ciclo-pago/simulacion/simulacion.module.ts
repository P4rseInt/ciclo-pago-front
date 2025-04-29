import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulacionComponent } from '@components/ciclo-pago/simulacion/simulacion.component';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { TabMenuModule } from 'primeng/tabmenu';
import { TablaGeneralModule } from '@shared/tabla-general/tabla-general.module';

@NgModule({
  declarations: [SimulacionComponent],
  imports: [
    CommonModule,
    AccordionModule,
    ButtonModule,
    CardModule,
    TableModule,
    InputSwitchModule,
    FormsModule,
    TabMenuModule,
    TablaGeneralModule
  ],
  exports: [SimulacionComponent]
})
export class SimulacionModule {}
