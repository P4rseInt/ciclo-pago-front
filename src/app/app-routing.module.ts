import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CicloPagoComponent } from '@components/ciclo-pago/ciclo-pago.component';
import { SimulacionComponent } from '@components/ciclo-pago/simulacion/simulacion.component';
import { ChecklistComponent } from '@components/ciclo-pago/checklist/checklist.component';

const routes: Routes = [
  {
    path: 'ciclo-pago-front',
    loadChildren: () =>
      import('@components/ciclo-pago/ciclo-pago.module').then(
        (m) => m.CicloPagoModule
      ),
    component: CicloPagoComponent
  },
  {
    path: 'ciclo-pago-front/simulacion',
    loadChildren: () =>
      import('@components/ciclo-pago/simulacion/simulacion.module').then(
        (m) => m.SimulacionModule
      ),
    component: SimulacionComponent
  },
  {
    path: 'ciclo-pago-front/simulacion/checklist',
    loadChildren: () =>
      import('@components/ciclo-pago/checklist/checklist.module').then(
        (m) => m.ChecklistModule
      ),
    component: ChecklistComponent
  },
  {
    path: 'ciclo-pago-front/nuevo-ciclo',
    loadChildren: () =>
      import('@components/ciclo-pago/nuevo-ciclo/nuevo-ciclo.module').then(
        (m) => m.NuevoCicloModule
      )
  },
  { path: '', redirectTo: 'ciclo-pago-front', pathMatch: 'full' },
  { path: '**', redirectTo: 'ciclo-pago-front' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
