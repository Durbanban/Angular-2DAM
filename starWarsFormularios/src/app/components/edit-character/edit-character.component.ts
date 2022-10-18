import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-character',
  templateUrl: './edit-character.component.html',
  styleUrls: ['./edit-character.component.css']
})
export class EditCharacterComponent implements OnInit {

  constructor(private ruta: ActivatedRoute) { }

  ngOnInit(): void {
  }

  cargarFormulario() {
    const personajeId = this.ruta.snapshot.paramMap.get('id');
  }

}
