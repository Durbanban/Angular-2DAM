import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PokemonDetailResponse } from 'src/app/interfaces/pokemon-details.interface';
import { Pokemon } from 'src/app/interfaces/pokemon-response.interface';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonInfoDialogComponent } from '../pokemon-info-dialog/pokemon-info-dialog.component';

@Component({
  selector: 'app-tabla-pokemon',
  templateUrl: './tabla-pokemon.component.html',
  styleUrls: ['./tabla-pokemon.component.css']
})
export class TablaPokemonComponent implements OnInit {
  
  listadoPokemon: Pokemon[] = [];
  pokemonElegido: PokemonDetailResponse | undefined;
  constructor(private pokeService: PokemonService, public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.pokeService.pokemonList().subscribe(response => {
      this.listadoPokemon = response.results;
    });
  }
  
  getPokemonPhoto(pokemon: Pokemon) {
    let id: string;
    id = pokemon.url.split("/").reverse()[1];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  }

  getPokemonDetails(pokemon: Pokemon) {
    this.pokeService.getPokemonDetails(pokemon).subscribe(respuesta => {
      this.pokemonElegido = respuesta;
      this.dialog.open(PokemonInfoDialogComponent, {
        data: {
          
          pokemonInfo: this.pokemonElegido
        }
      });
    })
  }



}
