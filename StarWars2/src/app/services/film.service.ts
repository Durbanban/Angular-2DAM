import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



const API_BASE_URL = 'https://swapi.dev/api';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private http: HttpClient) { }
}
