import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Character, CharacterResponse } from '../interfaces/character.interface';
@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  public getCharacters(page: number): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(`${environment.apiBaseUrl}people?page=${page}`)
  }

  public getById(id: number): Observable<Character> {
    return this.http.get<Character>(`${environment.apiBaseUrl}people/${id}`)
  }

  public getPlanetCharacters(lista: string[]): Observable<Character>[] {
    let characterList: Observable<Character>[] = []
    if(lista.length != 0) {
      lista.forEach(residente => {
        characterList.push(this.http.get<Character>(residente));
      })
    }
    return characterList;
  }
  
  public getStarshipCharacter(lista: string[]): Observable<Character>[] {
    let characterList: Observable<Character>[] = []
    if(lista.length != 0) {
      lista.forEach(piloto => {
        characterList.push(this.http.get<Character>(piloto));
      })
    }
    return characterList;
  }

  public getSpeciesCharacters(lista: string[]): Observable<Character>[] {
    let speciesList: Observable<Character>[] = [];
    if(lista.length != 0) {
      lista.forEach(personaje => {
        speciesList.push(this.http.get<Character>(personaje));
      })
    }
    return speciesList;
    
  }

  public getFilmsCharacters(lista: string[]): Observable<Character>[] {
    let filmList: Observable<Character>[] = [];
    if(lista.length != 0) {
      lista.forEach(personaje => {
        filmList.push(this.http.get<Character>(personaje));
      })
    }
    return filmList;
  }  
  public getVehicleCharacters(lista: string[]): Observable<Character>[] {
    let vehicleList: Observable<Character>[] = [];
    if(lista.length != 0) { 
      lista.forEach(piloto => {
        vehicleList.push(this.http.get<Character>(piloto));
      })
    }
    return vehicleList;
  }

}
