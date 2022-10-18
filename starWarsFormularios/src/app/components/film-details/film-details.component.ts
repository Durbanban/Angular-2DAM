import { Component, OnInit } from '@angular/core';
import { _MatTabGroupBase } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/interfaces/character.interface';
import { Film } from 'src/app/interfaces/film.interface';
import { Planet } from 'src/app/interfaces/planet.interface';
import { Species } from 'src/app/interfaces/species.interface';
import { starShip } from 'src/app/interfaces/starship.interface';
import { Vehicle } from 'src/app/interfaces/vehicle.interface';
import { CharacterService } from 'src/app/services/character.service';
import { FilmService } from 'src/app/services/film.service';
import { PlanetService } from 'src/app/services/planet.service';
import { SpeciesService } from 'src/app/services/species.service';
import { StarShipService } from 'src/app/services/star-ship.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css'],
})
export class FilmDetailsComponent implements OnInit {
  film!: Film;
  starshipFilmlist: starShip[] = [];
  characterFilmlist: Character[] = [];
  vehicleFilmList: Vehicle[]=[];
  planetFilmList: Planet[]=[]
  specieFilmList: Species[]=[]
  idPlanet: any;
  idVehicle: any;
  idStarship: any;
  idPersonaje: any;
  idSpecie: any;

  constructor(
    private ruta: ActivatedRoute,
    private characterService: CharacterService,
    private vehicleService: VehicleService,
    private filmService: FilmService,
    private planetService: PlanetService,
    private starshipService: StarShipService,
    private specieService: SpeciesService
  ) {}

  ngOnInit(): void {
    this.cargarPelicula();
  }

  cargarPelicula() {
    const peliId = Number(this.ruta.snapshot.paramMap.get('id'));
    this.filmService.getById(peliId).subscribe((respuesta) => {
      this.film = respuesta;
      this.getStarshipFilms();
      this.getCharactersFilms();
      this.getvehicleFilms();
      this.getPlanetFilms();
      this.getStarshipFilms();
      this.getSpeciesFilms();

    }); 
    
  }


  getvehicleFilms() {
    this.vehicleService.getFilmsvehicles(this.film.vehicles).forEach(vehiculo => {
      vehiculo.subscribe(respuesta => {
        if(respuesta.films.includes(this.film.url))
        this.vehicleFilmList.push(respuesta)
      })
    })

  }

  getPlanetFilms() {
    this.planetService.getFilmsPlanet(this.film.planets).forEach(planeta => {
      planeta.subscribe(respuesta => {
        if(respuesta.films.includes(this.film.url))
        this.planetFilmList.push(respuesta)
      })
    })
  }

  getSpeciesFilms(){
    this.specieService.getFilmsSpecies(this.film.species).forEach(especie => {
      especie.subscribe(respuesta => {
        if(respuesta.films.includes(this.film.url))
        this.specieFilmList.push(respuesta)
      })
    })
  }

  getStarshipFilms() {
    this.starshipService.getStarships().subscribe((respuesta) => {
      respuesta.results.forEach((starship) => {
        if (starship.films.includes(this.film.url)) {
          this.starshipFilmlist.push(starship);
        }
      });
    });
  }

  getCharactersFilms(){
    this.characterService.getFilmsCharacters(this.film.characters).forEach(protagonista => {
      protagonista.subscribe(respuesta => {
        if (respuesta.films.includes(this.film.url)) {
          this.characterFilmlist.push(respuesta)
          
        }
      })

    })
  }
  getFotoPelicula() {
    return `https://starwars-visualguide.com/assets/img/films/${
      this.film.url.split('/')[5]
    }.jpg`;
  }

  public getPhotoNaveURL(s: starShip): String {
    return `https://starwars-visualguide.com/assets/img/starships/${
      s.url.split('/')[5]
    }.jpg`;
  }

  getFotoPersonaje(personaje: Character) {
    this.idPersonaje = personaje.url.split('/')[5];
    return `https://starwars-visualguide.com/assets/img/characters/${this.idPersonaje}.jpg`
  }
  
  getFotoVehiculo(vehiculo: Vehicle) {
    this.idVehicle = vehiculo.url.split('/')[5];
    return `https://starwars-visualguide.com/assets/img/vehicles/${vehiculo.url.split('/')[5]}.jpg`;

  }
  getFotoNave(nave: starShip) {
    this.idStarship = nave.url.split('/')[5];
    return `https://starwars-visualguide.com/assets/img/starships/${nave.url.split('/')[5]}.jpg`
  }
  
  getFotoEspecie(especie: Species) {
    this.idSpecie = especie.url.split('/')[5];
    return `https://starwars-visualguide.com/assets/img/species/${especie.url.split('/')[5]}.jpg`
  }
  
  getFotoPlaneta(planeta: Planet) {
    this.idPlanet = planeta.url.split('/')[5];
    return `https://starwars-visualguide.com/assets/img/planets/${planeta.url.split('/')[5]}.jpg`
  }
}
