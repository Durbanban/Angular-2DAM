import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { SpeciesResponse } from '../interfaces/species.interface';


@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  constructor(private http: HttpClient) { }

  getSpecies(): Observable<SpeciesResponse> []{
    let respuesta: Observable<SpeciesResponse> [] = [];
    for (let index = 1; index <= 4; index++) {
      respuesta.push(this.http.get<SpeciesResponse>(`${environment.apiBaseUrl}/species?page=${index}`))
    }
    return respuesta;
  }
}
