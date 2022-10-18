import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Species, SpeciesResponse } from '../interfaces/species.interface';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  constructor(private http: HttpClient) { }

  public getSpecies(page: number): Observable<SpeciesResponse> {
    return this.http.get<SpeciesResponse>(`${environment.apiBaseUrl}species?page=${page}`)
  }

  public getById(id: number): Observable<Species> {
    return this.http.get<Species>(`${environment.apiBaseUrl}species/${id}`);
  }

  public getCharacterSpecies(lista: string[]): Observable<Species>[] {
    let SpeciesList: Observable<Species>[] = []
    if(lista.length != 0)
      lista.forEach(especie => {
        SpeciesList.push(this.http.get<Species>(especie));
      })
    return SpeciesList;
  }

  public getFilmsSpecies(lista: string[]): Observable<Species>[] {
    let filmList: Observable<Species>[] = [];
    if(lista.length != 0) {
      lista.forEach(especie => {
        filmList.push(this.http.get<Species>(especie));
      })
    }
    return filmList;
    
  }

}
