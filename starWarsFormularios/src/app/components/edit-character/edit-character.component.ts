import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
import { CharacterComponent } from '../character/character.component';

@Component({
  selector: 'app-edit-character',
  templateUrl: './edit-character.component.html',
  styleUrls: ['./edit-character.component.css']
})
export class EditCharacterComponent implements OnInit {

  editedCharacter: Character = {} as Character;
  editedCharacterPlanet: Planet = {} as Planet;
  planetList: Planet[] = [];
  filmList: Film[] = [];
  speciesList: Species[] = [];
  starshipList: starShip[] = [];
  vehicleList: Vehicle[] = [];
  editCharacterForm: FormGroup = {} as FormGroup;

  constructor(private ruta: ActivatedRoute,
    private planetService: PlanetService,
    private filmService: FilmService,
    private speciesService: SpeciesService,
    private starshipService: StarShipService,
    private vehicleService: VehicleService,
    private characterService: CharacterService) { }

  ngOnInit(): void {
    this.cargarFormulario();
  }

  cargarFormulario() {
    const personajeId = Number(this.ruta.snapshot.paramMap.get('id'));
    this.characterService.getById(personajeId).subscribe(respuesta => {
      this.editedCharacter = respuesta;
      this.planetService.getCharacterPlanet(this.editedCharacter.homeworld).subscribe(respuesta => {
        this.editedCharacterPlanet = respuesta;

        this.editCharacterForm = new FormGroup({
          nameFormControl: new FormControl(this.editedCharacter.name),
          heightFormControl: new FormControl(this.editedCharacter.height),
          massFormControl: new FormControl(this.editedCharacter.mass),
          hairColorFormControl: new FormControl(this.editedCharacter.hair_color),
          skinColorFormControl: new FormControl(this.editedCharacter.skin_color),
          eyeColorFormControl: new FormControl(this.editedCharacter.eye_color),
          birthdayFormControl: new FormControl(this.editedCharacter.birth_year),
          planetFormControl: new FormControl(this.editedCharacter.homeworld),
          filmFormControl: new FormControl(this.editedCharacter.films),
          speciesFormControl: new FormControl(this.editedCharacter.species),
          starshipFormControl: new FormControl(this.editedCharacter.starships),
          vehicleFormControl: new FormControl(this.editedCharacter.vehicles)
        });
      });
    });
    
    this.planetList = this.planetService.getAllPlanets();
    console.log(this.planetList);
    this.filmService.getFilms().subscribe(respuesta => {
      this.filmList = respuesta.results;
    });

    this.speciesList = this.speciesService.getAllSpecies();
    this.starshipList = this.starshipService.getAllStarships();
    this.vehicleList = this.vehicleService.getAllVehicles();
    
  }

  onSubmit() {
    alert('Personaje creado');
    console.log(this.editedCharacter.homeworld);
    this.editedCharacter.films.forEach(peli => {
      console.log(peli);
    })
  }

}
