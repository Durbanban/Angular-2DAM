import { Component, OnInit } from '@angular/core';
import { Gasolinera } from 'src/app/interfaces/Gasolinera.interface';
import { GasolineraService } from 'src/app/services/gasolinera.service';

@Component({
  selector: 'app-listado-gasolineras',
  templateUrl: './listado-gasolineras.component.html',
  styleUrls: ['./listado-gasolineras.component.css']
})
export class ListadoGasolinerasComponent implements OnInit {
  
  constructor(private gasolineraService: GasolineraService) { }
  
  gasList: Gasolinera[] = [];
  
  ngOnInit(): void {
    this.gasolineraService.getListadoGasolineras().subscribe(respuesta => {
      this.gasList = respuesta.ListaEESSPrecio;
    });
  }
  formatLabel(value: number) {
    if(value >= 1000) {
      return Math.round(value/1000) + 'k';
    }else{
      return value;
    }
  }
  
  priceFilter(price: number) {
    this.gasList.filter(gasolinera => {
      Number(gasolinera['Precio Gasolina 95 E5']) > price;
    });
  }

}
