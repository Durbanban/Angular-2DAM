import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/interfaces/character.interface';
import { Film } from 'src/app/interfaces/film.interface';
import { Planet } from 'src/app/interfaces/planet.interface';
import { CharacterService } from 'src/app/services/character.service';
import { FilmService } from 'src/app/services/film.service';
import { PlanetService } from 'src/app/services/planet.service';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.css']
})
export class PlanetDetailsComponent implements OnInit {

  planet!: Planet;
  planetFilmList: Film[] = [];
  planetCharacterList: Character[] = [];
  idPersonaje: any;
  idFilm: any;

  constructor(private ruta: ActivatedRoute,
    private planetService: PlanetService,
    private filmService: FilmService,
    private characterService: CharacterService) { }

  ngOnInit(): void {
    this.cargarPlaneta();
  }

  cargarPlaneta() {
    const planetaId = Number(this.ruta.snapshot.paramMap.get('id'));
    this.planetService.getById(planetaId).subscribe(respuesta => {
      this.planet = respuesta;

      this.characterService.getPlanetCharacters(this.planet.residents).forEach(residente => {
        residente.subscribe(respuesta => {
          this.planetCharacterList.push(respuesta);
        })
      })
      this.getPeliculasPlaneta();


      

    });


  }

  getFotoPlaneta() {
    return `https://starwars-visualguide.com/assets/img/planets/${this.planet.url.split('/')[5]}.jpg`
  }

  getFotoPelicula(pelicula: Film) {
    this.idFilm=pelicula.url.split('/')[5]
    return `https://starwars-visualguide.com/assets/img/films/${this.idFilm}.jpg`
  }

  getFotoPersonaje(personaje: Character) {
    this.idPersonaje = personaje.url.split('/')[5];
    return `https://starwars-visualguide.com/assets/img/characters/${this.idPersonaje}.jpg`
  }

  

  getPeliculasPlaneta() {
    this.filmService.getFilms().subscribe(respuesta => {
      respuesta.results.forEach(peli => {
        if(peli.planets.includes(this.planet.url)) {
          this.planetFilmList.push(peli);
        }
      });
    });
  }

}
