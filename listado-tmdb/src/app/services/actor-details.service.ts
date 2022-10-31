import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActorDetailsResponse } from '../models/interfaces/actor-details.interface';

@Injectable({
  providedIn: 'root'
})
export class ActorDetailsService {

  constructor(private http: HttpClient) { }

  public getById(id: number): Observable<ActorDetailsResponse> {
    return this.http.get<ActorDetailsResponse>(`${environment.apiBaseUrl}/person/${id}?api_key=${environment.apiKey}&language=es`)
  }

}
