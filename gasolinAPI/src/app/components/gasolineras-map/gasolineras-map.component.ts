import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Gasolinera } from 'src/app/interfaces/gasolinera.interface';

@Component({
  selector: 'app-gasolineras-map',
  templateUrl: './gasolineras-map.component.html',
  styleUrls: ['./gasolineras-map.component.css']
})
export class GasolinerasMapComponent implements OnInit {

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow = {} as MapInfoWindow;
  @Input() marcadores: google.maps.LatLngLiteral[] = [];
  @Input() gasPos: google.maps.LatLngLiteral = {} as google.maps.LatLngLiteral;
  @Input() zoomInput: number = 0;
  @Input() gasolineras: Gasolinera[] = [];
  @Input() userPos: google.maps.LatLngLiteral = {} as google.maps.LatLngLiteral; 
  gasStation: Gasolinera = {} as Gasolinera;
  pos: google.maps.LatLngLiteral= {} as google.maps.LatLngLiteral;

  userLat = this.userPos.lat;
  userLng = this.userPos.lng;

  

  constructor() { }

  ngOnInit(): void {
  }

  openInfoWindow(marcador:MapMarker, gasolinera: Gasolinera) {
    this.gasStation = gasolinera;  
    this.infoWindow.open(marcador);
  }

  calcDistance(gas: Gasolinera) {
    const gasLong = this.toNumber(gas['Longitud (WGS84)']);
    const gasLat = this.toNumber(gas.Latitud);
    let R = 6371; // km
    let dLat = this.convertToRad(this.userLat-gasLat);
    let dLon = this.convertToRad(this.userLng-gasLong);
    let lat1 = this.convertToRad(gasLat);
    let lat2 = this.convertToRad(this.userLat);

    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    let d = R * c;
    return d;
  }

  toNumber(cadena: string) {
    return Number(cadena.replace(',', '.'));
  }

  convertToRad(value: number) {
    return value * Math.PI / 180;
  }


}
