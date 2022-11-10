import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Gasolinera } from 'src/app/interfaces/Gasolinera.interface';
import { GasolineraService } from 'src/app/services/gasolinera.service';

@Component({
  selector: 'app-una-gasolinera',
  templateUrl: './una-gasolinera.component.html',
  styleUrls: ['./una-gasolinera.component.css']
})
export class UnaGasolineraComponent implements OnInit {

  @Input() gasolinera: Gasolinera = {} as Gasolinera;

  

  constructor() { }

  ngOnInit(): void {
  }

}
