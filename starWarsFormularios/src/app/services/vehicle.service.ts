import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Vehicle, VehicleResponse } from '../interfaces/vehicle.interface';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private http: HttpClient) {}

  public getVehicles(page: number): Observable<VehicleResponse> {
    return this.http.get<VehicleResponse>(`${environment.apiBaseUrl}vehicles/?page=${page}`);
  }

  public getById(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${environment.apiBaseUrl}vehicles/${id}`)
  }

  public getCharacterVehicles(lista: string[]): Observable<Vehicle>[] {
    let vehiclesList: Observable<Vehicle>[] = [];
    if(lista.length != 0) {
      lista.forEach(vehiculo => {
        vehiclesList.push(this.http.get<Vehicle>(vehiculo));
      })
    }
    return vehiclesList;
  }

  public getFilmsvehicles(lista: string[]): Observable<Vehicle>[] {
    let filmList: Observable<Vehicle>[] = [];
    if(lista.length != 0) {
      lista.forEach(coche => {
        filmList.push(this.http.get<Vehicle>(coche));
      })
    }
    return filmList;
    
  }
}