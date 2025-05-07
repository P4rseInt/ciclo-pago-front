import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CicloPagoComponent } from '@components/ciclo-pago/ciclo-pago.component';
import { SimulacionComponent } from '@components/ciclo-pago/simulacion/simulacion.component';
import { NuevoCicloComponent } from '@components/ciclo-pago/nuevo-ciclo/nuevo-ciclo.component';

const routes: Routes = [
  {
    path: '',
    component: CicloPagoComponent,
    data: { breadcrumb: 'Ciclos de pago' }
  },
  {
    path: 'nuevo-ciclo',
    component: NuevoCicloComponent,
    data: { breadcrumb: 'Nuevo ciclo' }
  },
  {
    path: 'simulacion',
    component: SimulacionComponent,
    data: { breadcrumb: 'Simulación' }
  },
  { path: '**', redirectTo: 'ciclo-pago-front' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
