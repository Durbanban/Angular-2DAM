import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character, CharacterResponse } from '../interfaces/character.interface';
import { Observable } from 'rxjs';

const API_BASE_URL = 'https://swapi.dev/api';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  public getCharacters(): Observable<CharacterResponse> {
    let paginas: string[] = [];
    return this.http.get<CharacterResponse>(`${API_BASE_URL}/people/`);
  }
}
