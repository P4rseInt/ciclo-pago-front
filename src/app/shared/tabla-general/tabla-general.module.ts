import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaGeneralComponent } from '@shared/tabla-general/tabla-general.component';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [TablaGeneralComponent],
  imports: [
    CommonModule,
    TableModule,
    CalendarModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    BrowserAnimationsModule
  ],
  exports: [TablaGeneralComponent]
})
export class TablaGeneralModule {}
