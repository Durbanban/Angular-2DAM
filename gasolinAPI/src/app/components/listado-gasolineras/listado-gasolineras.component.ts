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
  provinceList: Provincia[] = [];
  municipioList: Municipio[] = [];
  provinceSelected = '';
  fuelAttr: Gasolinera = {} as Gasolinera;
  orden = '';
  checkOrder = false;
  myControl = new FormControl('');
  options: Municipio[] = [];
  filteredOptions: Observable<string> | undefined;
  

  ngOnInit(): void {
    
    
    this.gasolineraService.getListadoGasolineras().subscribe((respuesta) => {
      this.gasList = respuesta.ListaEESSPrecio;
      this.gasListFiltered = respuesta.ListaEESSPrecio;
      this.provinciaService.getProvincias().subscribe(respuesta => {
        this.provinceList = respuesta;

      })
    });
  }
  formatLabel(value: number) {
    return value;
  }
  
  priceFilter() {
    this.filterBack();
    this.gasListFiltered = this.gasListFiltered.filter((gasolinera) => this.applyFilter(this.toNumber(gasolinera['Precio Gasolina 95 E5'])) && gasolinera.Provincia == this.provinceSelected);
    
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
      if(this.provinceSelected != '') {
        return true;
      }else {
        return false;
      }
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

  filterBack() {
    this.gasListFiltered = this.gasList;
  }

  provinceFilter() {
    this.filterBack();
    this.gasListFiltered = this.gasListFiltered.filter((gasolinera) => gasolinera.Provincia == this.provinceSelected && this.applyFilter(this.toNumber(gasolinera['Precio Gasolina 95 E5'])));
  }

  getMunicipios(id: string) {
    this.municipioService.getMunicipiosByIdProvincia(id).subscribe(respuesta => {
      this.municipioList = respuesta;
    })
  }



  
}
