import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoCiclosComponent } from '@components/ciclo-pago/listado-ciclos/listado-ciclos.component';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { SidebarModule } from 'primeng/sidebar';
import { TablaGeneralModule } from '@shared/tabla-general/tabla-general.module';
import { ToastModule } from 'primeng/toast';
import { ParametrosBusquedaModule } from '@shared/parametros-busqueda/parametros-busqueda.module';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { SimulacionModule } from '@components/ciclo-pago/simulacion/simulacion.module';

@NgModule({
  declarations: [ListadoCiclosComponent],
  providers: [ConfirmationService, MessageService],
  imports: [
    CommonModule,
    ButtonModule,
    ConfirmDialogModule,
    MessagesModule,
    SidebarModule,
    TablaGeneralModule,
    ToastModule,
    ParametrosBusquedaModule,
    RouterModule,
    CardModule,
    SimulacionModule
  ],
  exports: [ListadoCiclosComponent]
})
export class ListadoCiclosModule {}
