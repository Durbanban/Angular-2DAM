import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/interfaces/character.interface';
import { Film } from 'src/app/interfaces/film.interface';
import { starShip } from 'src/app/interfaces/starship.interface';
import { CharacterService } from 'src/app/services/character.service';
import { FilmService } from 'src/app/services/film.service';
import { StarShipService } from 'src/app/services/star-ship.service';

@Component({
  selector: 'app-star-ships-detail',
  templateUrl: './star-ships-detail.component.html',
  styleUrls: ['./star-ships-detail.component.css']
})
export class StarShipsDetailComponent implements OnInit {

  starShip!: starShip;
  starShipFilmList: Film[] = [];
  pilotList: Character[] = [];
  fotoPrueba = 'https://starwars-visualguide.com/assets/img/characters/1.jpg';
  pilot!: Character;
  idPersonaje:any;
  idFilm:any;

  constructor(private ruta: ActivatedRoute,
     private filmService: FilmService,
     private starshipService: StarShipService,
     private characterService: CharacterService
     ) { }

  ngOnInit(): void {

    this.cargarStarship();

  }

  cargarStarship() {
    const starShipId = Number(this.ruta.snapshot.paramMap.get('id'));
    this.starshipService.getById(starShipId).subscribe(respuesta => {
      this.starShip = respuesta;
      this.getStarshipFilms();

      this.characterService.getStarshipCharacter(respuesta.pilots).forEach(piloto => {
        piloto.subscribe(respuesta => {
          if (respuesta.starships.includes(this.starShip.url)) {
            this.pilotList.push(respuesta)
          }
        })
      })

    })
  }

  getFotoPersonaje(personaje: Character) {
    this.idPersonaje = personaje.url.split('/')[5];
    return `https://starwars-visualguide.com/assets/img/characters/${this.idPersonaje}.jpg`
  }

  getStarshipFilms(){
    this.filmService.getFilms().subscribe(respuesta => {
      respuesta.results.forEach(film => {
        if( film.starships.includes(this.starShip.url)){
          this.starShipFilmList.push(film)
        }

      })
    })
  }
  getFotoPelicula(pelicula: Film) {
    this.idFilm=pelicula.url.split('/')[5]
    return `https://starwars-visualguide.com/assets/img/films/${this.idFilm}.jpg`
  }

  public getPhotoURL(s: starShip): String {
    return `https://starwars-visualguide.com/assets/img/starships/${
      s.url.split('/')[5]
    }.jpg`;
  }


}
