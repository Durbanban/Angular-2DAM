import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/interfaces/character.interface';
import { Film } from 'src/app/interfaces/film.interface';
import { Vehicle } from 'src/app/interfaces/vehicle.interface';
import { CharacterService } from 'src/app/services/character.service';
import { FilmService } from 'src/app/services/film.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {

  vehicle!: Vehicle;
  vehicleCharacterList: Character[] = [];
  vehicleFilmList: Film[] = [];
  idPersonaje: any;
  idFilm:any;


  constructor(private ruta: ActivatedRoute,
    private vehicleService: VehicleService,
    private filmService: FilmService,
    private characterService: CharacterService) { }

  ngOnInit(): void {

    this.cargarVehiculo();
  }

  cargarVehiculo() {
    const vehiculoId = Number(this.ruta.snapshot.paramMap.get('id'));
    this.vehicleService.getById(vehiculoId).subscribe(respuesta => {
      this.vehicle = respuesta;

      this.filmService.getFilms().subscribe(respuesta => {
        respuesta.results.forEach(peli => {
          if(peli.vehicles.includes(this.vehicle.url)) {
            this.vehicleFilmList.push(peli);
          }
        })
      })

      this.characterService.getVehicleCharacters(this.vehicle.pilots).forEach(piloto => {
        piloto.subscribe(respuesta => {
          this.vehicleCharacterList.push(respuesta);
        })
      })
    })
  }

  getFotoPelicula(pelicula: Film) {
    this.idFilm=pelicula.url.split('/')[5]
    return `https://starwars-visualguide.com/assets/img/films/${this.idFilm}.jpg`
  }

  getFotoPersonaje(personaje: Character) {
    this.idPersonaje = personaje.url.split('/')[5];
    return `https://starwars-visualguide.com/assets/img/characters/${this.idPersonaje}.jpg`
  }

  getFotoVehiculo() {
    return `https://starwars-visualguide.com/assets/img/vehicles/${this.vehicle.url.split('/')[5]}.jpg`
  }

}
