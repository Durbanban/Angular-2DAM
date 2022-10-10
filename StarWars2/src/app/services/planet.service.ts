import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanetResponse } from '../interfaces/planet.interface';

const API_BASE_URL = 'https://swapi.dev/api'

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  constructor(private http: HttpClient) { }

  public getPlanets(): Observable<PlanetResponse> []{
    let respuesta: Observable<PlanetResponse> [] = [];     
    
    for (let index = 1; index <= 6; index++) {
      respuesta.push(this.http.get<PlanetResponse>(`${API_BASE_URL}/planets?page=${index}`));
    }
    return respuesta;
  }
}
