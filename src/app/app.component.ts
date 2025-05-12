import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'afp-habitat-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ciclo-pago-front';
  private readonly primengConfig = inject(PrimeNGConfig);

  constructor(private readonly router: Router) {
    // const registroDatosSentry = new SentryUser(
    //   this.oauthService,
    //   VERSION.version
    // );
    // const datosusuarios = JSON.parse(sessionStorage.getItem('datos_usuario'));
    // if (datosusuarios && datosusuarios.email) {
    //   registroDatosSentry.setearDatosUsuarioPGS(datosusuarios.email);
    // }
    console.table(this.router.config); // Muestra las rutas en formato tabla en la consola
  }

  ngOnInit(): void {
    this.primengConfig.setTranslation({
      dayNames: [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado'
      ],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre'
      ],
      monthNamesShort: [
        'ene',
        'feb',
        'mar',
        'abr',
        'may',
        'jun',
        'jul',
        'ago',
        'sep',
        'oct',
        'nov',
        'dic'
      ],
      today: 'Hoy',
      clear: 'Limpiar',
      apply: 'Aplicar',
      dateFormat: 'dd/mm/yy', // <-- ESTE CAMBIA EL FORMATO DE FECHA
      firstDayOfWeek: 1,
      addRule: 'Aplicar Regla',
      removeRule: 'Eliminar Regla',
      matchAll: 'Coincidir Todos',
      matchAny: 'Coincidir con cualquier',
      startsWith: 'Empieza con',
      contains: 'Contiene',
      notContains: 'No contiene',
      endsWith: 'Termina con',
      equals: 'Igual a',
      notEquals: 'Distinto a',
      lt: 'Menor que',
      lte: 'Menor o igual que',
      gt: 'Mayor que',
      gte: 'Mayor o igual que'
    });
  }
}
