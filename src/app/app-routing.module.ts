import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CicloPagoComponent } from '@components/ciclo-pago/ciclo-pago.component';

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
    path: 'ciclo-pago-front/pago-diario',
    loadChildren: () =>
      import('@components/ciclo-pago/ciclo-pago.module').then(
        (m) => m.CicloPagoModule
      )
  },
  {
    path: 'ciclo-pago-front/nuevo-ciclo',
    loadChildren: () =>
      import('@components/ciclo-pago/nuevo-ciclo/nuevo-ciclo.module').then(
        (m) => m.NuevoCicloModule
      )
  },
  { path: '', redirectTo: '/ciclo-pago-front/pago-diario', pathMatch: 'full' },
  { path: '**', redirectTo: '/ciclo-pago-front/pago-diario' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
