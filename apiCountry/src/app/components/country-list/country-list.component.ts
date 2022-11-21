import { Component, OnInit } from '@angular/core';
import { CountryResponse } from 'src/app/Model/Interfaces/country.interface';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

  countryList: CountryResponse[] = []
  country: CountryResponse = {} as CountryResponse;

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe(respuesta => {
      this.countryList = respuesta;
    });
    this.countryService.getCountryByCode('fr').subscribe(country => {
      this.country = country;
    })
  }

}
