import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateSessionDto } from '../models/dto/create-session.dto';
import { AccountDetailsResponse } from '../models/interfaces/account-details.interface';
import { CreateSessionResponse } from '../models/interfaces/create-sesion.interface';
import { RequestTokenResponse } from '../models/interfaces/request-token.inteface';
import { DeleteSessionDto } from '../models/dto/delete-session.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  createRequestToken(): Observable<RequestTokenResponse> {
    return this.http.get<RequestTokenResponse>(`${environment.apiBaseUrl}/authentication/token/new?api_key=${environment.apiKey}`);
  }

  createSession(token: CreateSessionDto): Observable<CreateSessionResponse> {
    return this.http.post<CreateSessionResponse>(`${environment.apiBaseUrl}/authentication/session/new?api_key=${environment.apiKey}`, token)
  }

  getUserDetails(session: string | null): Observable<AccountDetailsResponse> {
    return this.http.get<AccountDetailsResponse>(`${environment.apiBaseUrl}/account?session_id=${session}&api_key=${environment.apiKey}`)
  }

  deleteSession(session: DeleteSessionDto) {
    this.http.delete(`${environment.apiBaseUrl}/authentication/session?api_key=${environment.apiKey}`, {body: session});
  }

}
