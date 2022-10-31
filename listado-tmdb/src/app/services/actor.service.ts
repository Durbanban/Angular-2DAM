import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActorResponse } from '../models/interfaces/actor.interface';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(private http: HttpClient) { }

  public getPopularActors(page: number): Observable<ActorResponse> {
    return this.http.get<ActorResponse>(`${environment.apiBaseUrl}/person/popular?api_key=${environment.apiKey}&language=es&page=${page}`);
  }
}
