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

  

  constructor() { }

  ngOnInit(): void {
  }

}
