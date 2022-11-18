import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Gasolinera } from 'src/app/interfaces/gasolinera.interface';

@Component({
  selector: 'app-una-gasolinera',
  templateUrl: './una-gasolinera.component.html',
  styleUrls: ['./una-gasolinera.component.css']
})
export class UnaGasolineraComponent implements OnInit {

  @Input() gasolinera: Gasolinera = {} as Gasolinera;
  @Input() distance?: number = 0;
  @Input() fuelChecker: number = 0;
  @Input() fuelType: keyof typeof this.gasolinera = 'Precio Gasolina 95 E5';

  

  constructor() { }

  ngOnInit(): void {
  }

}
