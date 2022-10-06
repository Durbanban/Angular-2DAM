import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterResponse } from '../interfaces/character.interface';



const API_BASE_URL = 'https://swapi.dev/api';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private http: HttpClient) { }

  public getFilms(): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(`${API_BASE_URL}/films/`);
  }
}
