import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagoDiarioComponent } from '@components/ciclo-pago/pago-diario/pago-diario.component';
import { TableBackModule } from '@shared/table-back/table-back.module';
import { PagoDiarioRoutingModule } from '@components/ciclo-pago/pago-diario/pago-diario-routing.module';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [PagoDiarioComponent],
  imports: [
    DialogModule,
    CommonModule,
    TableBackModule,
    PagoDiarioRoutingModule,
    MessageModule,
    TableModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    SidebarModule,
    ConfirmDialogModule
  ],
  exports: [PagoDiarioComponent],
  providers: [ConfirmationService]
})
export class PagoDiarioModule {}
