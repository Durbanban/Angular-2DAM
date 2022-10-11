import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { PlanetResponse } from '../interfaces/planet.interface';


@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  constructor(private http: HttpClient) { }

  public getPlanets(): Observable<PlanetResponse> []{
    let respuesta: Observable<PlanetResponse> [] = [];     
    
    for (let index = 1; index <= 6; index++) {
      respuesta.push(this.http.get<PlanetResponse>(`${environment.apiBaseUrl}/planets?page=${index}`));
    }
    return respuesta;
  }
}
