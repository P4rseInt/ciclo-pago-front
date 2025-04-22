import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagoDiarioComponent } from './pago-diario.component';

const routes: Routes = [{ path: '', component: PagoDiarioComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagoDiarioRoutingModule {}
