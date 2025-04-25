import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModularTableComponent } from '@shared/modular-table/modular-table.component';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [ModularTableComponent],
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
  exports: [ModularTableComponent]
})
export class ModularTableModule {}
