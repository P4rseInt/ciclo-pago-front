import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoCicloComponent } from '@components/ciclo-pago/nuevo-ciclo/nuevo-ciclo.component';

const routes: Routes = [{ path: '', component: NuevoCicloComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NuevoCicloRoutingModule {}
