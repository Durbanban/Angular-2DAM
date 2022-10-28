import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActorDetailsResponse } from 'src/app/interfaces/actor-details.interface';
import { Actor } from 'src/app/interfaces/actor.interface';
import { ActorDetailsService } from 'src/app/services/actor-details.service';
import { environment } from 'src/environments/environment.prod';
import { DialogDetalleActorComponent } from '../dialog-detalle-actor/dialog-detalle-actor.component';

@Component({
  selector: 'app-one-actor',
  templateUrl: './one-actor.component.html',
  styleUrls: ['./one-actor.component.css']
})
export class OneActorComponent implements OnInit {

  @Input() actor: Actor = {} as Actor;

  

  constructor(public dialog: MatDialog, private actorDetailsService: ActorDetailsService) { }

  ngOnInit(): void {
  }

  openDialog(detalles: Actor) {
    this.actorDetailsService.getById(detalles.id).subscribe(respuesta => {
      this.dialog.open(DialogDetalleActorComponent, {
        data: {
          actor: respuesta,
          info: this.actor
        }
      });
    });
  }

  getActorPhoto(profile: string | null) {
    if(profile != null) {
      return `${environment.apiImgUrl}${profile}`
    }else {
      return 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/vida-belen-esteban-internet-mas-buscada-1631542015.jpg?crop=1.00xw:0.667xh;0,0.0532xh&resize=640:*'
    }
  }

 



}
