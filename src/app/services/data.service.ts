import { Injectable } from '@angular/core';
import { BehaviorSubject, delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  datosSimulacion: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private readonly http: HttpClient) {}

  setDatosSimulacion(data: any) {
    this.datosSimulacion.next(data);
  }

  getDatosSimulacion() {
    return this.datosSimulacion.getValue();
  }

  getData() {
    return this.http.get<any>('https://pokeapi.co/api/v2/pokemon/ditto');
  }
}
