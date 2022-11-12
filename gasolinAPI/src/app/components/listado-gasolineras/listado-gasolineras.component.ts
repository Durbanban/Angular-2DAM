import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Gasolinera } from 'src/app/interfaces/gasolinera.interface';

import { GasolineraService } from 'src/app/services/gasolinera.service';

@Component({
  selector: 'app-listado-gasolineras',
  templateUrl: './listado-gasolineras.component.html',
  styleUrls: ['./listado-gasolineras.component.css'],
})
export class ListadoGasolinerasComponent implements OnInit {
  constructor(private gasolineraService: GasolineraService) {}

  gasList: Gasolinera[] = [];
  fuelSelected = 'Precio Gasolina 95 E5';
  precio: number = 0;
  gasListFiltered: Gasolinera[] = [];
  fuelAttr: Gasolinera = {} as Gasolinera;
  orden = '';
  checkOrder = false;

  ngOnInit(): void {
    this.gasolineraService.getListadoGasolineras().subscribe((respuesta) => {
      this.gasList = respuesta.ListaEESSPrecio;
      this.gasListFiltered = respuesta.ListaEESSPrecio;
    });
  }
  formatLabel(value: number) {
    return value;
  }
  
  priceFilter() {
    this.gasListFiltered = this.gasList.filter((gasolinera) => this.applyFilter(this.toNumber(gasolinera['Precio Gasolina 95 E5'])));
    
  }

  toNumber(cadena: string) {
    return Number(cadena.replace(',', '.'));
  }

  applyFilter(filtro: number): boolean {
    if(filtro != 0) {
      if(filtro <= this.precio) {
        return true;
      }else {
        return false;
      }
    }else {
      return false;
    }
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
      if(this.toNumber(gasStA['Precio Gasolina 95 E5']) > this.toNumber(gasStB['Precio Gasolina 95 E5'])) {
        return 1;
      }else if (this.toNumber(gasStA['Precio Gasolina 95 E5']) < this.toNumber(gasStB['Precio Gasolina 95 E5'])) {
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
      if(this.toNumber(gasStA['Precio Gasolina 95 E5']) < this.toNumber(gasStB['Precio Gasolina 95 E5'])) {
        return 1;
      }else if (this.toNumber(gasStA['Precio Gasolina 95 E5']) > this.toNumber(gasStB['Precio Gasolina 95 E5'])) {
        return -1;
      }else {
        return 0;
      }
      
    });
    this.orden = '(Desc.)';
    this.checkOrder = !this.checkOrder;
  }

  selectFuel(fuelType: keyof typeof this.fuelAttr) {
    this.fuelSelected = fuelType;
  }
  
}
