import { Component, Input, OnInit } from '@angular/core';
import { Actor } from 'src/app/interfaces/actor.interface';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-one-actor',
  templateUrl: './one-actor.component.html',
  styleUrls: ['./one-actor.component.css']
})
export class OneActorComponent implements OnInit {

  @Input() actor: Actor = {} as Actor;

  

  constructor() { }

  ngOnInit(): void {
  }

  getActorPhoto(profile: string | null) {
    if(profile != null) {
      return `${environment.apiImgUrl}${profile}`
    }else {
      return 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/vida-belen-esteban-internet-mas-buscada-1631542015.jpg?crop=1.00xw:0.667xh;0,0.0532xh&resize=640:*'
    }
  }



}
