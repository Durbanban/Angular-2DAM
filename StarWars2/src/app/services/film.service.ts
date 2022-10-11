import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { FilmResponse } from '../interfaces/film.interface';




@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private http: HttpClient) { }

  public getFilms(): Observable<FilmResponse> {
    return this.http.get<FilmResponse>(`${environment.apiBaseUrl}/films/`);
  }
}
