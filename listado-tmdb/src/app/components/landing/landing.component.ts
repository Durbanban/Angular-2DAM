import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateSessionDto } from 'src/app/models/dto/create-session.dto';
import { DeleteSessionDto } from 'src/app/models/dto/delete-session.dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  session: CreateSessionDto = {} as CreateSessionDto;
  sessionDelete: DeleteSessionDto = {} as DeleteSessionDto;
  sessionID: string | null = '';
  userName!: string;
  avatarPath!: string;
  authToken = '';

  constructor(private router: Router,
    private ruta: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.createSession();
    this.authService.getUserDetails(this.sessionID).subscribe(respuesta => {
      this.userName = respuesta.username;
      this.avatarPath = `https://www.themoviedb.org/t/p/w32_and_h32_face/${respuesta.avatar.tmdb.avatar_path}`
    });
  }


  createSession() {
    this.ruta.queryParams.subscribe(params => {
      if(params['approved'] == 'true') {
        this.session.request_token = params['request_token'];
        this.authService.createSession(this.session).subscribe(respuesta => {
          this.sessionID = respuesta.session_id;
          localStorage.setItem('session_id', this.sessionID);
        });
      }
    });
  }

  requestToken() {
    this.authService.createRequestToken().subscribe(respuesta => {
      if(respuesta.success) {
        this.authToken = respuesta.request_token;
        console.log(this.authToken);
        window.location.href=`https://www.themoviedb.org/authenticate/${this.authToken}?redirect_to=http://localhost:4200/landing`
      }
    });
  }

  deleteSession() {
    let sessionDelete = new DeleteSessionDto();
    this.authService.deleteSession(sessionDelete);
    localStorage.removeItem('session_id');
    window.location.href="http://localhost:4200/landing"
  }

}
