import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  datosSimulacion: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {}

  setDatosSimulacion(data: any) {
    this.datosSimulacion.next(data);
  }

  getDatosSimulacion() {
    return this.datosSimulacion.getValue();
  }
}
