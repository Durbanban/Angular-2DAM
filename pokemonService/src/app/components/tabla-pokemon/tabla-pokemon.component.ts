import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemon-response.interface';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-tabla-pokemon',
  templateUrl: './tabla-pokemon.component.html',
  styleUrls: ['./tabla-pokemon.component.css']
})
export class TablaPokemonComponent implements OnInit {

  listadoPokemon: Pokemon[] = [];
  constructor(private pokeService: PokemonService) { }

  ngOnInit(): void {
    this.pokeService.pokemonList().subscribe(response => {
      this.listadoPokemon = response.results;
    });
  }

  mostrarPokemons() {
  }

}
