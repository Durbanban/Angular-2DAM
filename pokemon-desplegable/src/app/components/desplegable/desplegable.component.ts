import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemon.interface';
import { PokemonService } from 'src/app/services/pokemon.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-desplegable',
  templateUrl: './desplegable.component.html',
  styleUrls: ['./desplegable.component.css']
})
export class DesplegableComponent implements OnInit {

  listaPokemon: Pokemon[] = [];
  pokemonSelected: Pokemon = {} as Pokemon;
  pokemonId: any;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getFiftyPokemon().subscribe(respuesta => {
      this.listaPokemon = respuesta.results;
    })
  }

  getPhotoPokemon (pokemon: Pokemon) {
    this.pokemonId = pokemon.url.split('/').reverse()[1];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemonId}.png`;
  }


}
