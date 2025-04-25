import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';

@Component({
  selector: 'app-simulacion',
  templateUrl: './simulacion.component.html',
  styleUrls: ['./simulacion.component.scss']
})
export class SimulacionComponent implements OnInit {
  constructor(private readonly dataService: DataService) {}

  datosCiclo = null;

  ngOnInit() {
    this.datosCiclo = this.dataService.getDatosSimulacion();
    console.log('datosCiclo', this.datosCiclo);
  }
}
