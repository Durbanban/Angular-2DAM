import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  userEmail: string = '';
  userPassword: string = '';
  
  formulario = new FormGroup({
    emailFormControl: new FormControl(this.userEmail, [Validators.required, Validators.email]),
    passwordFormControl: new FormControl(this.userPassword, [Validators.required, Validators.minLength(8)])
  });
  
  constructor() { }
  
  ngOnInit(): void {
  }
  onSubmit() {
    alert('FORMULARIO ENVIADO')
  }
  
}
