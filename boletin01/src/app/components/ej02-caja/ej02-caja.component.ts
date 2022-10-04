import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ej02-caja',
  templateUrl: './ej02-caja.component.html',
  styleUrls: ['./ej02-caja.component.css']
})
export class Ej02CajaComponent implements OnInit {

  icono="expand_more";
  claseBody="bodyNoVisible";
  claseContainer="margenVisible";

  constructor() { }

  cambiarIcono() {
    if(this.icono=="expand_more") {
      this.icono="expand_less";
      this.claseBody="bodyVisible";
      this.claseContainer="margenNoVisible";
      this
    }else if(this.icono=="expand_less") {
      this.icono="expand_more";
      this.claseBody="bodyNoVisible";
      this.claseContainer="margenVisible";
    }
  }

  ngOnInit(): void {
  }

}
