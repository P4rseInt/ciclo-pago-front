import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaGeneralComponent } from '@shared/tabla-general/tabla-general.component';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

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
    BrowserAnimationsModule,
    RadioButtonModule,
    TagModule,
    TooltipModule
  ],
  exports: [TablaGeneralComponent]
})
export class TablaGeneralModule {}
