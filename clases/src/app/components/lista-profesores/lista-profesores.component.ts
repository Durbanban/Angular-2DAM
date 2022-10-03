import { Component, OnInit } from '@angular/core';


interface Profesor {
  nombre: string;
  asignatura: string;
  frase: string;
}

const PROFESORES: Profesor[] = [
  {nombre: 'Miguel Campos', asignatura: 'Desarrollo de Interfaces', frase: 'No os lo creeréis, pero fui vendedor de seguros'},
  {nombre: 'Luis Miguel Lopez', asignatura: 'Base de datos', frase: 'Úbeda es la capital del mundo y las demás ciudades son pueblos'},
  {nombre: 'Ángel Naranjo', asignatura: 'Programación', frase: 'No se copia código'},
  {nombre: 'Rafael Villar', asignatura: 'Lenguaje de Marcas', frase: 'Estoy contento de que este año vamos a tener tiempo para JavaScript'}
  
];

@Component({
  selector: 'app-lista-profesores',
  templateUrl: './lista-profesores.component.html',
  styleUrls: ['./lista-profesores.component.css']
})

export class ListaProfesoresComponent implements OnInit {

  lista=PROFESORES;

  constructor() { }

  ngOnInit(): void {
  }

}
