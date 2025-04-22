import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagoDiarioComponent } from '@components/ciclo-pago/pago-diario/pago-diario.component';
import { PagoDiarioRoutingModule } from '@components/ciclo-pago/pago-diario/pago-diario-routing.module';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { ModularTableModule } from '@shared/modular-table/modular-table.module';

@NgModule({
  declarations: [PagoDiarioComponent],
  imports: [
    DialogModule,
    CommonModule,
    PagoDiarioRoutingModule,
    MessageModule,
    TableModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    SidebarModule,
    ConfirmDialogModule,
    CardModule,
    MessagesModule,
    ToastModule,
    CalendarModule,
    ReactiveFormsModule,
    ModularTableModule
  ],
  exports: [PagoDiarioComponent],
  providers: [ConfirmationService, MessageService]
})
export class PagoDiarioModule {}
