import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteSessionDto } from 'src/app/models/dto/delete-session.dto';
import { ActorDetailsResponse } from 'src/app/models/interfaces/actor-details.interface';
import { Actor } from 'src/app/models/interfaces/actor.interface';
import { ActorDetailsService } from 'src/app/services/actor-details.service';
import { ActorService } from 'src/app/services/actor.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { DialogDetalleActorComponent } from '../dialog-detalle-actor/dialog-detalle-actor.component';

@Component({
  selector: 'app-listado-actores',
  templateUrl: './listado-actores.component.html',
  styleUrls: ['./listado-actores.component.css']
})
export class ListadoActoresComponent implements OnInit {
  
  listadoActores: Actor[] =[];
  page = 1;
  totalPages = 0;
  abierto = false;
  sessionID: string | null = '';
  authToken = '';
  
  userName!: string;
  avatarPath!: string;



  
  constructor(private actorService: ActorService,
     private authService: AuthService) { }
  
  ngOnInit(): void {
    this.sessionID = localStorage.getItem('session_id');
    this.getPopular(this.page);
    this.authService.getUserDetails(this.sessionID).subscribe(respuesta => {
      this.userName = respuesta.username;
      this.avatarPath = `https://www.themoviedb.org/t/p/w32_and_h32_face/${respuesta.avatar.tmdb.avatar_path}`
    });

  }

  getPopular(page: number) {
    this.actorService.getPopularActors(page).subscribe(respuesta => {
      this.totalPages = respuesta.total_pages;
      this.listadoActores = respuesta.results;
    })
    this.page = page;
  }


  numPages() {
    return Array(this.totalPages);
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

  deleteSession(sessionID: string | null) {
    if(sessionID != null) {
      let sessionDelete = new DeleteSessionDto();
      sessionDelete.session_id = sessionID;
      this.authService.deleteSession(sessionDelete);
      localStorage.removeItem('session_id');
      window.location.href="http://localhost:4200/actors"
    }
  }
  

}
