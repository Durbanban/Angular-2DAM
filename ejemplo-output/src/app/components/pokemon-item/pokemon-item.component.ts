import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.css']
})
export class PokemonItemComponent implements OnInit {
  
  @Input() nombre: string = '';
  @Output() pokemonSelectEvent = new EventEmitter<string>();
  
  constructor() { }
  
  ngOnInit(): void {
  }
  //Entrará en este método cuando se pulse el botón seleccionar
  onPokemonSelected() {
    this.pokemonSelectEvent.emit(this.nombre);
  }


}
