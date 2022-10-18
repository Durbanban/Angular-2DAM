import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { starShip, StarShipResponse } from '../interfaces/starship.interface';

@Injectable({
  providedIn: 'root'
})
export class StarShipService {

  constructor(private http: HttpClient) { }

  public getStarShip(page: number): Observable<StarShipResponse> {
    return this.http.get<StarShipResponse>(`${environment.apiBaseUrl}starships?page=${page}`)
  }

  public getCharacterStarships(lista: string[]): Observable<starShip>[] {
    let starshipList: Observable<starShip>[] = [];
    if(lista.length != 0) {
      lista.forEach(nave => {
        starshipList.push(this.http.get<starShip>(nave));
      })
    }
    return starshipList;
  }
  public getById(id: number): Observable<starShip> {
    return this.http.get<starShip>(`${environment.apiBaseUrl}starships/${id}`)
  }

  public getStarships(): Observable<StarShipResponse>{
    return this.http.get<StarShipResponse>(`${environment.apiBaseUrl}starships`)
    }



}
