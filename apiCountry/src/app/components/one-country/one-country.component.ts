import { Component, Input, OnInit } from '@angular/core';
import { CountryResponse } from 'src/app/Model/Interfaces/country.interface';

@Component({
  selector: 'app-one-country',
  templateUrl: './one-country.component.html',
  styleUrls: ['./one-country.component.css']
})
export class OneCountryComponent implements OnInit {

  @Input() country: CountryResponse = {} as CountryResponse;
  constructor() { }

  ngOnInit(): void {
  }

}
