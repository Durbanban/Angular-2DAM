import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/interfaces/character.interface';
import { Film } from 'src/app/interfaces/film.interface';
import { Planet } from 'src/app/interfaces/planet.interface';
import { Species } from 'src/app/interfaces/species.interface';
import { CharacterService } from 'src/app/services/character.service';
import { FilmService } from 'src/app/services/film.service';
import { PlanetService } from 'src/app/services/planet.service';
import { SpeciesService } from 'src/app/services/species.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  
  characterList: Character[] = [];
  filmList: Film[] = [];
  planetList: Planet[] = [];
  speciesList: Species[] = []
  pagina = 1;
  page!: number;
  
  constructor(private characterService: CharacterService, 
    private filmService: FilmService, 
    private planetService: PlanetService, 
    private speciesService: SpeciesService) { }
  
  ngOnInit(): void {
    this.speciesService.getSpecies().forEach(cr => {
      cr.subscribe(c => {
        c.results.forEach(species => {
          this.speciesList.push(species);
        })
      })
    })
    
    this.filmService.getFilms().subscribe(c => {
      this.filmList = c.results;
    })

    this.planetService.getPlanets().forEach(cr => {
      cr.subscribe(c => {
        c.results.forEach(planet => {
          this.planetList.push(planet);
        })
      })
    })

    this.characterService.getCharacters().forEach(cr => {
      cr.subscribe(c => {
        c.results.forEach(character => {
          this.characterList.push(character);
        })
        this.characterList.reverse();
      })
    })
  };
  
  
  getFotoPersonaje(personaje: Character) {
    let id = personaje.url.split("/")[5];
    return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
  }

  getFotoEspecie(especie: Species) {
    let id = especie.url.split("/")[5];
    return `https://starwars-visualguide.com/assets/img/species/${id}.jpg`
  }
  
  getPeliculas(personaje: Character) {
    let characterFilms: Film[] = [];
    this.filmList.forEach(film => {
      film.characters.forEach(character => {
        if(character == personaje.url) {
          characterFilms.push(film);
        }
      })
    })
    return characterFilms;
  }

  mostrarPaginacionEspecies(eleccion: number) {
    let subLista: Species[] = [];
    if(eleccion == 1) {
      subLista = this.speciesList.slice(0, 10);
      this.pagina = 1;
    }
    else if(eleccion == 2) {
      subLista = this.speciesList.slice(11, 21);
      this.pagina = 2;
    }
    else if(eleccion == 3) {
      subLista = this.speciesList.slice(22, 32);
      this.pagina = 3;
    }
    else if(eleccion == 4) {
      subLista = this.speciesList.slice(33, 40);
      this.pagina = 4;
    }

    return subLista;
  }
  

  

}

