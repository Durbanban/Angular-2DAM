import { Component, OnInit } from '@angular/core';
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
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {

  character!: Character;
  characterFilmList: Film[] = [];
  characterVehicleList: Vehicle[] = [];
  characterStarshipList: starShip[] = [];
  characterSpeciesList: Species[] = [];
  characterPlanet!: Planet;
  idFilm: any;

  constructor(private ruta: ActivatedRoute,
     private characterService: CharacterService,
     private planetService: PlanetService,
     private filmService: FilmService,
     private vehicleService: VehicleService,
     private starshipService: StarShipService,
     private speciesService: SpeciesService) { }

  ngOnInit(): void {

    this.cargarPersonaje();

  }

  cargarPersonaje() {
    const personajeId = Number(this.ruta.snapshot.paramMap.get('id'));
    this.characterService.getById(personajeId).subscribe(respuesta => {
      this.character = respuesta;
      this.planetService.getCharacterPlanet(respuesta.homeworld).subscribe(respuesta => {
        this.characterPlanet = respuesta;
      });      
      
      this.speciesService.getCharacterSpecies(respuesta.species).forEach(especie => {
        especie.subscribe(respuesta => {
          this.characterSpeciesList.push(respuesta);
        });
      });
      
      this.getPeliculasPersonaje();
      
      this.vehicleService.getCharacterVehicles(respuesta.vehicles).forEach(vehiculo => {
        vehiculo.subscribe(respuesta => {
          this.characterVehicleList.push(respuesta);
        });
      });
      
      this.starshipService.getCharacterStarships(respuesta.starships).forEach(nave => {
        nave.subscribe(respuesta => {
          this.characterStarshipList.push(respuesta);
        });
      });

    })
    
    
    
  }

  getFotoPersonaje() {
    let id = this.character.url.split("/")[5];
    return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
  }



  getPeliculasPersonaje() {
    this.filmService.getFilms().subscribe(respuesta => {
      respuesta.results.forEach(film => {
        if(film.characters.includes(this.character.url)) {
          this.characterFilmList.push(film);
        }
      });
    })
  }

  getFotoPelicula(pelicula: Film) {
    this.idFilm = pelicula.url.split('/')[5]
    return `https://starwars-visualguide.com/assets/img/films/${this.idFilm}.jpg`
  }
  
  getFotoVehiculo(vehiculo: Vehicle) {
    return `https://starwars-visualguide.com/assets/img/vehicles/${vehiculo.url.split('/')[5]}.jpg`;

  }

  getFotoNave(nave: starShip) {
    return `https://starwars-visualguide.com/assets/img/starships/${nave.url.split('/')[5]}.jpg`
  }


}
