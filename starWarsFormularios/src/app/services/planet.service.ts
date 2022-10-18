import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Planet, PlanetResponse } from '../interfaces/planet.interface';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  constructor(private http: HttpClient) { }

  public getPlanets(page: number): Observable<PlanetResponse> {
    return this.http.get<PlanetResponse>(`${environment.apiBaseUrl}planets?page=${page}`)
  }

  public getById(id: number): Observable<Planet> {
    return this.http.get<Planet>(`${environment.apiBaseUrl}planets/${id}`);
  }

  public getCharacterPlanet(url: string): Observable<Planet> {
    return this.http.get<Planet>(url);
  }

  public getFilmsPlanet(lista: string[]): Observable<Planet>[] {
    let filmList: Observable<Planet>[] = [];
    if(lista.length != 0) {
      lista.forEach(planeta => {
        filmList.push(this.http.get<Planet>(planeta));
      })
    }
    return filmList;
    
  }
}
