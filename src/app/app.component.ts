import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'afp-habitat-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ciclo-pago-front';

  constructor(private router: Router) {
    console.table(this.router.config); // Muestra las rutas en formato tabla en la consola
  }
}
