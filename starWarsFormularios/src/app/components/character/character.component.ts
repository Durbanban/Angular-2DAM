import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/interfaces/character.interface';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  characterList: Character[]= [];
  pages = 0;
  page = 0;
  idPersonaje: any;

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {

    this.getCharactersPage(1);

  }

  getCharactersPage(page: number) {
    this.page = page;
    this.characterService.getCharacters(page).subscribe(respuesta => {
      this.characterList = respuesta.results;
      this.pages = Math.ceil(respuesta.count / 10)

    })
  }

  contadorPaginas() {
    return Array(this.pages);
  }

  getFotoPersonaje(personaje: Character) {
    this.idPersonaje = personaje.url.split("/")[5];
    return `https://starwars-visualguide.com/assets/img/characters/${this.idPersonaje}.jpg`;
  }

}
