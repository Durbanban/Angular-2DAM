import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ChildActivationStart } from '@angular/router';
import { Character } from 'src/app/interfaces/character.interface';
import { Film } from 'src/app/interfaces/film.interface';
import { Species } from 'src/app/interfaces/species.interface';
import { CharacterService } from 'src/app/services/character.service';
import { FilmService } from 'src/app/services/film.service';
import { SpeciesService } from 'src/app/services/species.service';

@Component({
  selector: 'app-species-details',
  templateUrl: './species-details.component.html',
  styleUrls: ['./species-details.component.css']
})
export class SpeciesDetailsComponent implements OnInit {

  species!: Species;
  speciesCharacterList: Character[] = [];
  speciesFilmList: Film[] = [];
  idPersonaje: any;
  idFilm:any;

  constructor(private ruta: ActivatedRoute,
    private speciesService: SpeciesService,
    private characterService: CharacterService,
    private filmService: FilmService) { }

  ngOnInit(): void {

    this.cargarEspecie();

  }

  cargarEspecie() {
    const especieId = Number(this.ruta.snapshot.paramMap.get('id'));
    this.speciesService.getById(especieId).subscribe(respuesta => {
      this.species = respuesta;

      this.characterService.getSpeciesCharacters(this.species.people).forEach(personaje => {
        personaje.subscribe(respuesta => {
          this.speciesCharacterList.push(respuesta);
        })
      })

      this.filmService.getFilms().subscribe(respuesta => {
        respuesta.results.forEach(peli => {
          if(peli.species.includes(this.species.url)) {
            this.speciesFilmList.push(peli);
          }
        })
      })



    })
  }

  getFotoEspecie() {
    return `https://starwars-visualguide.com/assets/img/species/${this.species.url.split('/')[5]}.jpg`
  }

  getFotoPelicula(pelicula: Film) {
    this.idFilm=pelicula.url.split('/')[5]
    return `https://starwars-visualguide.com/assets/img/films/${this.idFilm}.jpg`
  }

  getFotoPersonaje(personaje: Character) {
    this.idPersonaje = personaje.url.split('/')[5];
    return `https://starwars-visualguide.com/assets/img/characters/${this.idPersonaje}.jpg`
  }

}
