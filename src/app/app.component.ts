import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import * as console from 'node:console';

@Component({
  selector: 'afp-habitat-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ciclo-pago-front';

  items: MenuItem[] | undefined;

  home: MenuItem | undefined;

  constructor(private router: Router) {
    console.table(this.router.config); // Muestra las rutas en formato tabla en la consola
  }

  ngOnInit(): void {
    this.home = { routerLink: 'ciclo-pago-front', label: 'Ciclos de pago' };

    this.items = [
      { label: 'Nuevo ciclo', routerLink: 'ciclo-pago-front/nuevo-ciclo' },
      { label: 'Ciclo N°', routerLink: 'ciclo-pago-front/simulacion' }
    ];
  }
}
