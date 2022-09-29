import { Component, OnInit } from '@angular/core';

export interface Alumno {
  nombre: string;
  apellido: string;
  dni: string;
  edad: number;
  nota: number;
  peso: number;
  altura: number;
}

const ALUMNOS: Alumno[] = [
  {nota: 7.3, nombre: 'Pepito', peso: 81.9, dni: '1234156789X', apellido: 'Grillo', edad: 51, altura: 161},
  {nota: 2.2, nombre: 'Jasmine', peso: 104.6, dni: '879876548H', apellido: 'Disney', edad: 24, altura: 175},
  {nota: 3.7, nombre: 'Paco', peso: 76.9, dni: '998978751G', apellido: 'Tous', edad: 51, altura: 201},
  {nota: 4.1, nombre: 'Javier', peso: 79.2, dni: '332526454F', apellido: 'Javiérez', edad: 31, altura: 206},
  {nota: 5.8, nombre: 'Pablo', peso: 98.8, dni: '231554565Y', apellido: 'Furiase', edad: 41, altura: 156},
  {nota: 6.3, nombre: 'Jaimito', peso: 64.7, dni: '778778774J', apellido: 'Benavente', edad: 12, altura: 172},
  {nota: 7.8, nombre: 'Urko', peso: 84.7, dni: '787546516Q', apellido: 'Urzaiz', edad: 54, altura: 148},
  {nota: 8.1, nombre: 'Jordi', peso: 150.9, dni: '225225232U', apellido: 'Català', edad: 12, altura: 198},
  {nota: 9.4, nombre: 'Lucas', peso: 76.9, dni: '554558569G', apellido: 'Pato', edad: 51, altura: 187},
  {nota: 10, nombre: 'Yisus', peso: 70.4, dni: '321001457D', apellido: 'Christ', edad: 33, altura: 164},
];

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})

export class TablaComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'dni', 'edad', 'nota', 'peso', 'altura'];
  datos = ALUMNOS;  
  
  constructor() { }

  ngOnInit(): void {
  }

}
