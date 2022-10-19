import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonPhoto'
})
export class PokemonPhotoPipe implements PipeTransform {

  transform(id: string): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  }

}
