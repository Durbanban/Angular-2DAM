import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Gasolinera } from 'src/app/interfaces/gasolinera.interface';

import { Municipio } from 'src/app/interfaces/municipio.interface';
import { Provincia } from 'src/app/interfaces/provincia.interface';



import { GasolineraService } from 'src/app/services/gasolinera.service';
import { MunicipioService } from 'src/app/services/municipio.service';
import { ProvinciaService } from 'src/app/services/provincia.service';

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
  fuelSelected = 'Precio Gasolina 95 E5';
  precio: number = 5;
  gasListFiltered: Gasolinera[] = [];
  gasListFilteredByProvince: Gasolinera[] = []
  gasListFilteredByProvinceAndMunicipio: Gasolinera[] = [];
  provinceList: Provincia[] = [];
  municipioList: Municipio[] = [];
  provinceSelected = '';
  fuelAttr: Gasolinera = {} as Gasolinera;
  orden = '';
  checkOrder = false;
  municipioSelected = '';
  fuel: keyof typeof this.fuelAttr = 'Precio Gasolina 95 E5';
  

  ngOnInit(): void {
    
    this.getLocation();
    this.gasolineraService.getListadoGasolineras().subscribe((respuesta) => {
      this.gasList = respuesta.ListaEESSPrecio;
      this.gasListFiltered = respuesta.ListaEESSPrecio;
      this.fuelAttr = this.gasList[0];
      this.provinciaService.getProvincias().subscribe(respuesta => {
        this.provinceList = respuesta;
      });
    });
  }

  formatLabel(value: number) {
    return value;
  }
  
  priceFilter() {
    if(this.provinceSelected != '' && this.municipioSelected != ''){
      this.gasListFiltered = this.gasList.filter((gasolinera) => this.toNumber(gasolinera[this.fuel]) != 0 && this.toNumber(gasolinera[this.fuel]) <= this.precio && gasolinera.IDMunicipio == this.municipioSelected && gasolinera.IDProvincia == this.provinceSelected);
    }else if(this.provinceSelected != '' && this.municipioSelected == ''){
      this.gasListFiltered = this.gasList.filter((gasolinera) => this.toNumber(gasolinera[this.fuel]) != 0 && this.toNumber(gasolinera[this.fuel]) <= this.precio && gasolinera.IDProvincia == this.provinceSelected);
    }else if(this.provinceSelected == '' && this.municipioSelected == '') {
      this.gasListFiltered = this.gasList.filter((gasolinera) => this.toNumber(gasolinera[this.fuel]) != 0 && this.toNumber(gasolinera[this.fuel]) <= this.precio);
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

  sortByMinPrice() {
    this.gasListFiltered = this.gasListFiltered.sort((gasStA, gasStB) => {
      if(this.toNumber(gasStA[this.fuel]) > this.toNumber(gasStB[this.fuel])) {
        return 1;
      }else if (this.toNumber(gasStA[this.fuel]) < this.toNumber(gasStB[this.fuel])) {
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
      if(this.toNumber(gasStA[this.fuel]) < this.toNumber(gasStB[this.fuel])) {
        return 1;
      }else if (this.toNumber(gasStA[this.fuel]) > this.toNumber(gasStB[this.fuel])) {
        return -1;
      }else {
        return 0;
      }
      
    });
    this.orden = '(Desc.)';
    this.checkOrder = !this.checkOrder;
  }

  

  provinceFilter() {
   this.municipioSelected = '';
   this.municipioService.getMunicipiosByIdProvincia(this.provinceSelected).subscribe(respuesta => {
    this.municipioList = respuesta;
   });
   this.priceFilter();
  }

  municipioFilter() {
    this.gasListFilteredByProvinceAndMunicipio = this.gasListFilteredByProvince;
    this.gasListFilteredByProvinceAndMunicipio = this.gasListFilteredByProvince.filter((gasolinera) => gasolinera.IDMunicipio == this.municipioSelected);
  }

  clearFilter() {
    this.provinceSelected = '';
    this.municipioSelected = '';
    this.priceFilter();
  }

  clearFilterMunicipio() {
    this.municipioSelected = '';
    this.priceFilter();
  }

  getLocation(): void{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;
          this.callApi(longitude, latitude);
        });
    } else {
       console.log("No support for geolocation")
    }
  }

  callApi(Longitude: number, Latitude: number){
    const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${Longitude}&lat=${Latitude}`
    //Call API
  }



  
}
