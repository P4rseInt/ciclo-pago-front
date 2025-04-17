import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametrosComponent } from '@components/ciclo-pago/parametros/parametros.component';
import { DividerModule } from 'primeng/divider';
import { MatCardModule } from '@angular/material/card';
import { CardModule } from 'primeng/card';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ValorNumberPipe } from '../../../pipes/valor-number.pipe';
import { ValorNumberTramoPipe } from '../../../pipes/valor-number-tramos.pipe';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [ParametrosComponent],
  imports: [
    CommonModule,
    DividerModule,
    MatCardModule,
    CardModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    ValorNumberPipe,
    ValorNumberTramoPipe,
    MessageModule,
    TableModule,
    MessagesModule,
    ButtonModule
  ],
  exports: [ParametrosComponent]
})
export class ParametrosModule {}
