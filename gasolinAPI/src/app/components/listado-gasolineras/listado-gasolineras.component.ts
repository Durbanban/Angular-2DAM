import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';


import { Municipio } from 'src/app/interfaces/municipio.interface';
import { Provincia } from 'src/app/interfaces/provincia.interface';

import {map, startWith} from 'rxjs/operators';

import { GasolineraService } from 'src/app/services/gasolinera.service';
import { MunicipioService } from 'src/app/services/municipio.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { Gasolinera } from 'src/app/interfaces/gasolinera.interface';
import { MapMarkerClusterer } from '@angular/google-maps';

@Component({
  selector: 'app-listado-gasolineras',
  templateUrl: './listado-gasolineras.component.html',
  styleUrls: ['./listado-gasolineras.component.css'],
})
export class ListadoGasolinerasComponent implements OnInit {
  constructor(private gasolineraService: GasolineraService,
    private municipioService: MunicipioService,
    private provinciaService: ProvinciaService) {}

  gasList: Gasolinera[] = [];
  precio: number = 3;
  gasListFiltered: Gasolinera[] = [];
  provinceList: Provincia[] = [];
  municipioList: Municipio[] = [];
  provinceSelected: string[] = [];
  fuelAttr: Gasolinera = {} as Gasolinera;
  orden = '';
  ordenDistance= '';
  checkOrder = false;
  checkOrderDistance = false;
  municipioSelected = '';
  fuel: keyof typeof this.fuelAttr = 'Precio Gasolina 95 E5';
  filteredOptions!: Observable<Municipio[]>;
  myControl = new FormControl('');
  userPosition: google.maps.LatLngLiteral = {} as google.maps.LatLngLiteral;
  userLat = 0;
  userLng = 0;
  gasPosition: google.maps.LatLngLiteral = {} as google.maps.LatLngLiteral;
  mapZoom = 4;
  gasPositions: google.maps.LatLngLiteral[] = [];
  cluster: MapMarkerClusterer = {} as MapMarkerClusterer;

  

  ngOnInit(): void {
    this.getLocation();
    this.gasolineraService.getListadoGasolineras().subscribe((respuesta) => {
      debugger;
      this.gasList = respuesta.ListaEESSPrecio;
      this.gasList.forEach(gas => {
        gas.Position = {lat: Number(gas.Latitud.replace(',', '.')), lng: Number(gas['Longitud (WGS84)'].replace(',', '.'))};
      });
      this.gasListFiltered = this.gasList;
      this.fuelAttr = this.gasList[0];
      this.gasPosition = {lat: 40.294514, lng: -4.129742};
      this.priceFilter();
      this.provinciaService.getProvincias().subscribe(respuesta => {
        this.provinceList = respuesta;
      });
    });
  }
  
  formatLabel(value: number) {
    return value;
  }

  _filter(value: string): Municipio[] {
    const filterValue = value.toLowerCase();
    
    return this.municipioList.filter(municipio => municipio.Municipio.toLowerCase().includes(filterValue));
  }
  
  priceFilter() {
    if(this.provinceSelected.length != 0 && this.municipioSelected != ''){
      this.gasListFiltered = this.gasList.filter((gasolinera) => 
        this.toNumber(gasolinera[this.fuel] as string) != 0 
        && this.toNumber(gasolinera[this.fuel] as string) <= this.precio 
        && gasolinera.Municipio.toLowerCase().includes(this.municipioSelected.toLowerCase()) 
        && this.provinceSelected.includes(gasolinera.IDProvincia));
      this.mapZoom = 11;
      this.gasPosition = {lat: this.toNumber(this.gasListFiltered[0].Latitud), lng: this.toNumber(this.gasListFiltered[0]['Longitud (WGS84)'])}
    }else if(this.provinceSelected.length != 0 && this.municipioSelected == ''){
      this.gasListFiltered = this.gasList.filter((gasolinera) => 
        this.toNumber(gasolinera[this.fuel] as string) != 0 
        && this.toNumber(gasolinera[this.fuel] as string) <= this.precio 
        && this.provinceSelected.includes(gasolinera.IDProvincia));
      this.mapZoom= 8;
      this.gasPosition = {lat: this.toNumber(this.gasListFiltered[0].Latitud), lng: this.toNumber(this.gasListFiltered[0]['Longitud (WGS84)'])}
    }else if(this.provinceSelected.length == 0 && this.municipioSelected == '') {
      this.gasListFiltered = this.gasList.filter((gasolinera) => 
        this.toNumber(gasolinera[this.fuel] as string) != 0 
        && this.toNumber(gasolinera[this.fuel] as string) <= this.precio);  
      this.mapZoom = 5;
      this.gasPosition = {lat: 40.294514, lng: -4.129742}
    }    
  }
  
  toNumber(cadena: string) {
    return Number(cadena.replace(',', '.'));
  }
  
  sorting() {
    if(this.checkOrder) {
      this.sortByMinPrice();
    }else {
      this.sortByMaxPrice();
    }
  }
  
  sortingDistance() {
    if(this.checkOrderDistance) {
      this.sortByMinDistance();
    }else {
      this.sortByMaxDistance();
    }
  }
  
  sortByMinPrice() {
    this.gasListFiltered = this.gasListFiltered.sort((gasStA, gasStB) => {
      if(this.toNumber(gasStA[this.fuel] as string) > this.toNumber(gasStB[this.fuel] as string)) {
        return 1;
      }else if (this.toNumber(gasStA[this.fuel] as string) < this.toNumber(gasStB[this.fuel] as string)) {
        return -1;
      }else {
        return 0;
      }
      
    });
    this.orden = '(Asc.)'
    this.checkOrder = !this.checkOrder;
  }
  
  sortByMaxPrice() {
    this.gasListFiltered = this.gasListFiltered.sort((gasStA, gasStB) => {
      if(this.toNumber(gasStA[this.fuel] as string) < this.toNumber(gasStB[this.fuel] as string)) {
        return 1;
      }else if (this.toNumber(gasStA[this.fuel] as string) > this.toNumber(gasStB[this.fuel] as string)) {
        return -1;
      }else {
        return 0;
      }
      
    });
    this.orden = '(Desc.)';
    this.checkOrder = !this.checkOrder;
  }
  
  sortByMaxDistance() {
    this.gasListFiltered = this.gasListFiltered.sort((gasStA, gasStB) => {
      if(this.calcDistance(gasStA) < this.calcDistance(gasStB)) {
        return 1;
      }else if (this.calcDistance(gasStA) > this.calcDistance(gasStB)) {
        return -1;
      }else {
        return 0;
      }
      
    });
    this.ordenDistance = '(Desc.)'
    this.checkOrderDistance = !this.checkOrderDistance;
  }
  
  sortByMinDistance() {
    this.gasListFiltered = this.gasListFiltered.sort((gasStA, gasStB) => {
      if(this.calcDistance(gasStA) > this.calcDistance(gasStB)) {
        return 1;
      }else if (this.calcDistance(gasStA) < this.calcDistance(gasStB)) {
        return -1;
      }else {
        return 0;
      }
      
    });
    this.ordenDistance = '(Asc.)'
    this.checkOrderDistance = !this.checkOrderDistance;
  }
  
  provinceFilter() {
      this.municipioSelected = '';
      this.municipioList = [];
      this.provinceSelected.forEach(IDprovincia => {
        this.municipioService.getMunicipiosByIdProvincia(IDprovincia).subscribe(respuesta => {
        this.municipioList = this.municipioList.concat(respuesta);
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
      });
    });
    this.priceFilter();
  }

  clearFilter() {
    this.provinceSelected = [];
    this.municipioSelected = '';
    this.priceFilter();
  }

  clearFilterMunicipio() {
    this.municipioSelected = '';
    this.priceFilter();
  }
  
  getLocation(): void{
    if(this.userPosition.lat == 0 && this.userPosition.lng == 0) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          this.userLat = position.coords.latitude;
          this.userLng = position.coords.longitude;
          this.userPosition = {lat: this.userLat, lng: this.userLng};
        });
      }else {
        console.log("No support for geolocation")
      }
    }

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

  convertToRad(value: number) {
    return value * Math.PI / 180;
  }

  checkFuel() {
    if(this.fuel == 'Precio Gasoleo A') {
      return 1;
    }else if (this.fuel == 'Precio Gasolina 95 E5') {
      return 2;
    }else if (this.fuel == 'Precio Hidrogeno') {
      return 3;
    }else if(this.fuel == 'Precio Biodiesel') {
      return 4;
    }else {
      return 5;
    }
  }

}
