import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActorDetailsResponse } from 'src/app/interfaces/actor-details.interface';
import { Actor } from 'src/app/interfaces/actor.interface';
import { ActorDetailsService } from 'src/app/services/actor-details.service';
import { ActorService } from 'src/app/services/actor.service';
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


  
  constructor(private actorService: ActorService, private actorDetailsService: ActorDetailsService) { }
  
  ngOnInit(): void {
    this.getPopular(this.page);

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
  

}
