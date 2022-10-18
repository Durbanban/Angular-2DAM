import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/interfaces/vehicle.interface';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
})
export class VehiclesComponent implements OnInit {
  listadoVehiculos: Vehicle[] = [];
  page = 0;
  numPages = 0;
  idVehiculo: any;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.getVehiclesPage(1);
  }

  contadorPaginas() {
    return Array(this.numPages);
  }

  getVehiclesPage(page: number) {
    this.page = page;
    this.vehicleService.getVehicles(page).subscribe(resp => {
      this.listadoVehiculos = resp.results;
      this.numPages = Math.ceil(resp.count / 10);
    });
  }

  public getPhotoURL(v: Vehicle): String {
    this.idVehiculo = v.url.split('/')[5];
    return `https://starwars-visualguide.com/assets/img/vehicles/${this.idVehiculo}.jpg`;

  }
}
