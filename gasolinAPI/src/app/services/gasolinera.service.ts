import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { GasolineraResponse } from '../interfaces/gasolinera.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GasolineraService {

  constructor(private http: HttpClient) { }

  public getListadoGasolineras(): Observable<GasolineraResponse> {
    return this.http.get<GasolineraResponse>(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/`);
  }
}
