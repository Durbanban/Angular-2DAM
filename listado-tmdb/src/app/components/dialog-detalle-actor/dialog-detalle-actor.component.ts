import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActorDetailsResponse } from 'src/app/interfaces/actor-details.interface';
import { Actor } from 'src/app/interfaces/actor.interface';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-dialog-detalle-actor',
  templateUrl: './dialog-detalle-actor.component.html',
  styleUrls: ['./dialog-detalle-actor.component.css']
})
export class DialogDetalleActorComponent implements OnInit {

  actor: ActorDetailsResponse = {} as ActorDetailsResponse;
  info: Actor = {} as Actor;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    actor: ActorDetailsResponse,
    info: Actor
  }) { }

  ngOnInit(): void {
    this.actor = this.data.actor;
    this.info = this.data.info;
  }

  getActorPhoto(profile: string | null) {
    if(profile != null) {
      return `${environment.apiImgUrl}${profile}`
    }else {
      return 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/vida-belen-esteban-internet-mas-buscada-1631542015.jpg?crop=1.00xw:0.667xh;0,0.0532xh&resize=640:*'
    }
  }

  getFilmPhoto(profile?: string) {
    return `${environment.apiImgUrl}/${profile}`
  }



  
}
