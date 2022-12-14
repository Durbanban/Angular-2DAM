import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  
  @Input() pokemon: Pokemon = {} as Pokemon;
  @Output() pokemonSeleccionado = new EventEmitter<Pokemon>();


  listadoPokemonDetallado: PokemonDetailResponse[] = [];
  pokemonElegido: PokemonDetailResponse | undefined;
  tipos: string[] = []

  constructor(private pokeService: PokemonService, public dialog: MatDialog) { }
  
  ngOnInit(): void {
  }
  
  getPokemonPhoto(pokemon: Pokemon) {
    let id: string;
    id = pokemon.url.split("/").reverse()[1];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  }

  getPokemonDetails(pokemon: Pokemon) {
    this.pokeService.getPokemonDetails(pokemon).subscribe(respuesta => {
      respuesta.height = respuesta.height * 30,48;
      this.pokemonElegido = respuesta;
      this.dialog.open(PokemonInfoDialogComponent, {
        data: {
          
          pokemonInfo: this.pokemonElegido
        }
      });
    });
  }

  selectPokemon(poke: Pokemon) {
    this.pokemonSeleccionado.emit(poke);
    console.log(poke.name);
  }




}
