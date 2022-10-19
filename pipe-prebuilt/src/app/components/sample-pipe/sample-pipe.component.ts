import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample-pipe',
  templateUrl: './sample-pipe.component.html',
  styleUrls: ['./sample-pipe.component.css']
})
export class SamplePipeComponent implements OnInit {


  fecha = Date.now();
  precio = 2414.41;
  idPokemon = '3';



  constructor() { }

  ngOnInit(): void {
  }

}
