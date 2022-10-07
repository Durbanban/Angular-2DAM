import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon, PokemonResponse } from '../interfaces/pokemon-response.interface';
import { Observable } from 'rxjs';
import { PokemonDetailResponse } from '../interfaces/pokemon-details.interface';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {


  constructor(private http: HttpClient) { }

  public pokemonList(): Observable<PokemonResponse> {
    return this.http.get<PokemonResponse>(`${API_BASE_URL}/pokemon`);
  }

  //TODO
  public getPokemon(id: string) {
    return this.http.get(`${API_BASE_URL}/pokemon/${id}`);
  }

  public getPokemonDetails(pokemon: Pokemon): Observable<PokemonDetailResponse> {
    let id = pokemon.url.split("/").reverse()[1];
    return this.http.get<PokemonDetailResponse>(`${API_BASE_URL}/pokemon/${id}`);
  }




}
