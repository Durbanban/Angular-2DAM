import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemon-response.interface';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-parent',
  templateUrl: './pokemon-parent.component.html',
  styleUrls: ['./pokemon-parent.component.css']
})
export class PokemonParentComponent implements OnInit {

  pokemonSelected: Pokemon = {} as Pokemon;
  listadoPokemon: Pokemon[] = [];
  checkPokemon: boolean = false;

  constructor(private pokeService: PokemonService) { }

  ngOnInit(): void {
    this.pokeService.pokemonList().subscribe(response => {
      this.listadoPokemon = response.results;
    });
    
  }

  capturarPokemon(event: Pokemon) {
    this.pokemonSelected = event;
    this.checkPokemon = true;
  }

}
