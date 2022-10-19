import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/interfaces/character.interface';
import { Film } from 'src/app/interfaces/film.interface';
import { Planet } from 'src/app/interfaces/planet.interface';
import { Species } from 'src/app/interfaces/species.interface';
import { starShip } from 'src/app/interfaces/starship.interface';
import { Vehicle } from 'src/app/interfaces/vehicle.interface';
import { FilmService } from 'src/app/services/film.service';
import { PlanetService } from 'src/app/services/planet.service';
import { SpeciesService } from 'src/app/services/species.service';
import { StarShipService } from 'src/app/services/star-ship.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-new-character',
  templateUrl: './new-character.component.html',
  styleUrls: ['./new-character.component.css']
})
export class NewCharacterComponent implements OnInit {
  
  newCharacter: Character = {} as Character;
  planetList: Planet[] = [];
  filmList: Film[] = [];
  speciesList: Species[] = [];
  starshipList: starShip[] = [];
  vehicleList: Vehicle[] = [];
  
  characterCreateForm = new FormGroup({
    nameFormControl: new FormControl(this.newCharacter.name),
    heightFormControl: new FormControl(this.newCharacter.height),
    massFormControl: new FormControl(this.newCharacter.mass),
    hairColorFormControl: new FormControl(this.newCharacter.hair_color),
    skinColorFormControl: new FormControl(this.newCharacter.skin_color),
    eyeColorFormControl: new FormControl(this.newCharacter.eye_color),
    birthdayFormControl: new FormControl(this.newCharacter.birth_year),
    planetFormControl: new FormControl(this.newCharacter.homeworld),
    filmFormControl: new FormControl(this.newCharacter.films),
    speciesFormControl: new FormControl(this.newCharacter.species),
    starshipFormControl: new FormControl(this.newCharacter.starships),
    vehicleFormControl: new FormControl(this.newCharacter.vehicles)
  });
  
  constructor(private planetService: PlanetService,
    private filmService: FilmService,
    private speciesService: SpeciesService,
    private starshipService: StarShipService,
    private vehicleService: VehicleService) { }
  
  ngOnInit(): void {
    this.getPlanetList();
    this.getFilmList();
    this.getSpeciesList();
    this.getStarshipList();
    this.getVehicleList();
    
  }
  
  getPlanetList() {
    this.planetList = this.planetService.getAllPlanets();
  }

  getFilmList() {
    this.filmService.getFilms().subscribe(respuesta => {
      this.filmList = respuesta.results;
    })
  }

  getSpeciesList() {
    this.speciesList = this.speciesService.getAllSpecies();
  }

  getStarshipList() {
    this.starshipList = this.starshipService.getAllStarships();
  }

  getVehicleList() {
    this.vehicleList = this.vehicleService.getAllVehicles();
  }

  onSubmit() {
    alert('Personaje creado');
    console.log(this.newCharacter.homeworld);
    this.newCharacter.films.forEach(peli => {
      console.log(peli);
    })
  }
}
