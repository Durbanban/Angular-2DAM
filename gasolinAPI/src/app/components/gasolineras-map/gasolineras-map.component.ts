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
  @Input() userPos: google.maps.LatLngLiteral = {} as google.maps.LatLngLiteral;
  @Input() zoomInput: number = 0;
  @Input() gasolineras: Gasolinera[] = [];

  

  constructor() { }

  ngOnInit(): void {
  }

  openInfoWindow(marcador: MapMarker) {
    this.infoWindow.open(marcador);
  }

  getGasPosition(gasolinera: Gasolinera): google.maps.LatLngLiteral {
    let pos: google.maps.LatLngLiteral = 
    {lat: Number(gasolinera.Latitud.replace(',', '.')), 
    lng: Number(gasolinera['Longitud (WGS84)'].replace(',', '.'))};
    return pos;
  }

}
