import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CharacterResponse } from '../interfaces/character.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  public getCharacters(): Observable<CharacterResponse>[] {
    let paginas: Observable<CharacterResponse>[] = [];
    for (let index = 1; index <= 9; index++) {    
      let pagina: Observable<CharacterResponse> = this.http.get<CharacterResponse>(`${environment.apiBaseUrl}/people?page=${index}`);
      paginas.push(pagina);
    }
    return paginas;
  }
}
