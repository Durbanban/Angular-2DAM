import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ej01-login',
  templateUrl: './ej01-login.component.html',
  styleUrls: ['./ej01-login.component.css']
})
export class Ej01LoginComponent implements OnInit {
  oculta='password';
  ojito='visibility_off';
  deshabilitado=false;
  
  constructor() { }
  
  ngOnInit(): void {
  }
  
  cambiarOjito() {
    if(this.ojito=='visibility') {
      this.ojito='visibility_off';
      this.oculta='password';
    }else if(this.ojito=='visibility_off') {
      this.ojito='visibility';
      this.oculta='text';
    }
  }
}
