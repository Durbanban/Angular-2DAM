import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authToken = '';
  sessionID: string | null = '';

  constructor(private authService: AuthService,
     private router: Router) { }

  ngOnInit(): void {
    this.sessionID = localStorage.getItem('session_id');
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

}
