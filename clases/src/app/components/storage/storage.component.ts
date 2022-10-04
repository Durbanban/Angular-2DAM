import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {

  localData='';

  constructor() { }

  ngOnInit(): void {
  }

  guardar() {
    if(this.localData='') {
      alert('Escribe algo antes de guardar');
    }
    localStorage.setItem('data', this.localData);
    alert('Dato guardado');
    this.localData='';
  }

}
