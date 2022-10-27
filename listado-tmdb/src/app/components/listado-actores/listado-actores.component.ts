import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/interfaces/actor.interface';
import { ActorService } from 'src/app/services/actor.service';

@Component({
  selector: 'app-listado-actores',
  templateUrl: './listado-actores.component.html',
  styleUrls: ['./listado-actores.component.css']
})
export class ListadoActoresComponent implements OnInit {
  
  listadoActores: Actor[] =[];
  page = 1;
  totalPages = 0;


  
  constructor(private actorService: ActorService) { }
  
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
