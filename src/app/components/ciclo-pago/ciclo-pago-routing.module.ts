import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CicloPagoComponent } from '@components/ciclo-pago/ciclo-pago.component';

const routes: Routes = [{ path: '', component: CicloPagoComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CicloPagoRoutingModule {}
