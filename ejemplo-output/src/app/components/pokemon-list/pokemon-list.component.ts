import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  
  pokemonSelected = '';
  
  constructor() { }
  
  ngOnInit(): void {
  }
  
  changeSelected(eventNombrePokemonSeleccionado: string) {
    this.pokemonSelected = eventNombrePokemonSeleccionado;
  }
}
