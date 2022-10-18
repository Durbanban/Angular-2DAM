import { Component, OnInit } from '@angular/core';
import { Planet } from 'src/app/interfaces/planet.interface';
import { PlanetService } from 'src/app/services/planet.service';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})
export class PlanetComponent implements OnInit {

  planetList: Planet[] = [];
  pages = 0;
  page = 0;
  idPlaneta: any;

  constructor(private planetService: PlanetService) { }

  ngOnInit(): void {
    this.getPlanetsPage(1);

  }

  getPlanetsPage(page: number) {
    this.page = page;
    this.planetService.getPlanets(page).subscribe(respuesta => {
      this.planetList = respuesta.results;
      this.pages = Math.ceil(respuesta.count / 10)
    })

  }

  contadorPaginas() {
    return Array(this.pages);
  }

  getFotoPlaneta(planeta: Planet) {
    this.idPlaneta = planeta.url.split('/')[5];
    return `https://starwars-visualguide.com/assets/img/planets/${this.idPlaneta}.jpg`
  }

  

}
