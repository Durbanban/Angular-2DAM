import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/interfaces/character.interface';
import { Planet } from 'src/app/interfaces/planet.interface';
import { PlanetService } from 'src/app/services/planet.service';

@Component({
  selector: 'app-new-character',
  templateUrl: './new-character.component.html',
  styleUrls: ['./new-character.component.css']
})
export class NewCharacterComponent implements OnInit {
  
  newCharacter: Character = {} as Character;
  planetList: Planet[] = [];
  
  characterCreateForm = new FormGroup({
    
    
  });
  
  constructor(private planetService: PlanetService) { }
  
  ngOnInit(): void {
    this.getPlanetList();
  }
  
  getPlanetList() {
    debugger;
    this.planetService.getAllPlanets().forEach(respuesta => {
      respuesta.forEach(planeta => {
        this.planetList = planeta.results;
      })
    })
  }

  onSubmit() {
    alert('Personaje creado');
    console.log();
  }
}
