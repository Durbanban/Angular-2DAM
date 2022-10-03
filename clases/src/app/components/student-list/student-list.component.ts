import { Component, OnInit } from '@angular/core';
import { ALUMNOS_FAKE } from 'src/app/models/fake-data';
import { Gender } from 'src/app/gender.enum';
import { Student } from 'src/app/models/student.interface';



@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  studentList = ALUMNOS_FAKE;

  studentGender = Gender;
  
  definirGenero(alumno: Student) {
    let studentGender = '';
    
    if(alumno.gender==Gender.HOMBRE) {
      studentGender = 'male';
    }else if(alumno.gender==Gender.MUJER) {
      studentGender = 'female';
    }else if(alumno.gender==Gender.NO_BINARIO) {
      studentGender = 'not_listed_location';
    }else if(alumno.gender==Gender.HELICOPTERO_APACHE) {
      studentGender = 'flight_land';
    }
    return studentGender;
  }

  ordenarLista() {
    this.studentList=this.studentList.sort((a, b) => a.surname.localeCompare(b.surname));
  }
  
  constructor() { }
  
  ngOnInit(): void {
  }

}
