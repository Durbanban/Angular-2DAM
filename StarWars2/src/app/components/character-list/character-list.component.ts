import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/interfaces/character.interface';
import { Film } from 'src/app/interfaces/film.interface';
import { CharacterService } from 'src/app/services/character.service';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  
  characterList: Character[] = [];
  filmList: Film[] = [];
  pagina: string | undefined;
  
  constructor(private characterService: CharacterService, private filmService: FilmService) { }
  
  ngOnInit(): void {
    this.characterService.getCharacters().subscribe(c => {
      this.characterList = c.results;
    })
  }
  
  getFotoPersonaje(personaje: Character) {
    let id = personaje.url.split("/")[5];
    return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
  }

  getPeliculas(personaje: Character) {
    let id = personaje.url.split("/")[5];
    this.filmService.getFilms().subscribe(c => {
      this.filmList = c.results.filter(peli => {
        peli.characters.includes(personaje.url);
      });
    });
  }

  

}
