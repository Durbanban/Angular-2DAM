import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CountryResponse } from '../Model/Interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  
  constructor(private http: HttpClient) { }

  getAllCountries():Observable<CountryResponse[]> {
    return this.http.get<CountryResponse[]>('http://localhost:8080/country');
  }

  getCountryByCode(code: string): Observable<CountryResponse> {
    return this.http.get<CountryResponse>(`http://localhost:8080/country/${code}`);
  }
}
