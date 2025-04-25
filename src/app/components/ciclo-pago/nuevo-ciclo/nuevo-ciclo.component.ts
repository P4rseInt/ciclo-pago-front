import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-ciclo',
  templateUrl: './nuevo-ciclo.component.html',
  styleUrls: ['./nuevo-ciclo.component.scss']
})
export class NuevoCicloComponent implements OnInit {
  currentStep = 0;
  steps: MenuItem[] | undefined;

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.steps = [
      { label: 'Asignación de Lotes y Segmentación' },
      { label: 'Parámetros' },
      { label: 'Universo de Pagos' }
    ];
  }

  async goToPrevious() {
    if (this.currentStep > 0) {
      this.currentStep--;
    } else if (this.currentStep === 0) {
      await this.navigateToCicloPago();
    }
  }

  goToNext() {
    if (this.currentStep < this.steps.length - 1) this.currentStep++;
  }

  async navigateToCicloPago() {
    await this.router.navigate(['ciclo-pago-front']);
  }
}
