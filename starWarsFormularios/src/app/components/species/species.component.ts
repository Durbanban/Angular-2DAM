import { Component, OnInit } from '@angular/core';
import { Species } from 'src/app/interfaces/species.interface';
import { SpeciesService } from 'src/app/services/species.service';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css']
})
export class SpeciesComponent implements OnInit {

  speciesList: Species[] = [];
  pages = 0;
  page = 0;
  idEspecie: any;

  constructor(private speciesService: SpeciesService) { }

  ngOnInit(): void {
    this.getSpeciesPage(1);
  }

  getSpeciesPage(pagina: number) {
    this.page = pagina;
    this.speciesService.getSpecies(pagina).subscribe(respuesta => {
      this.speciesList = respuesta.results;
      this.pages = Math.ceil(respuesta.count / 10);
    })
  }

  contadorPaginas() {
    return Array(this.pages);
  }

  getFotoEspecie(especie: Species) {
    this.idEspecie = especie.url.split('/')[5];
    return `https://starwars-visualguide.com/assets/img/species/${this.idEspecie}.jpg`
  }

}
