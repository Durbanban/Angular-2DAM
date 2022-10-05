import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

export interface Alumno {
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  curso: string;
}

const ALUMNOS: Alumno[] = [
  {nombre: 'Mario', apellidos: 'Ruiz', fechaNacimiento: '20-05-1993', curso: '2ºDAM'},
  {nombre: 'Carlos Jesús', apellidos: 'Durbán Viloca', fechaNacimiento: '20-05-2002', curso: '2ºDAM'},
  {nombre: 'Valentín', apellidos: 'Tola Rodríguez', fechaNacimiento: '07-08-1999', curso: '2ºDAM'},
  {nombre: 'Arturo', apellidos: 'Céspedes', fechaNacimiento: '06-12-2001', curso: '2ºDAM'},
  {nombre: 'Jose Ignacio', apellidos: 'Rivas', fechaNacimiento: '12-10-1995', curso: '2ºDAM'},
 
];

@Component({
  selector: 'app-ej03-tabla',
  templateUrl: './ej03-tabla.component.html',
  styleUrls: ['./ej03-tabla.component.css']
})
export class Ej03TablaComponent implements OnInit {

  
  columnas: string[] = ['name', 'surname', 'birthdate', 'course', 'acciones'];
  lista=ALUMNOS;
  
  @ViewChild(MatTable)
  table!: MatTable<Alumno>;
  
  constructor() { }
  
  ngOnInit(): void {
  }

  borrarColumnas(index: number) {
    
  }

  borrarAlumno(alumno: Alumno) {
    this.lista.splice(this.lista.indexOf(alumno), 1);
    this.table.renderRows();

    
    /*
    let listaAux = this.lista;
    let borrado=listaAux.indexOf(alumno);
    listaAux.splice(borrado, 1);
    this.lista=listaAux;
    this.table.renderRows();
    */
  }

  editarAlumno(alumno: Alumno) {
    /*EN CONSTRUCCIÓN*/

    
  }




}
