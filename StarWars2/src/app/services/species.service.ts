import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpeciesResponse } from '../interfaces/species.interface';

const API_BASE_URL = 'https://swapi.dev/api'

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  constructor(private http: HttpClient) { }

  getSpecies(): Observable<SpeciesResponse> []{
    let respuesta: Observable<SpeciesResponse> [] = [];
    for (let index = 1; index <= 4; index++) {
      respuesta.push(this.http.get<SpeciesResponse>(`${API_BASE_URL}/species?page=${index}`))
    }
    return respuesta;
  }
}
