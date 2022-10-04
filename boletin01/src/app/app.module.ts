import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialImportsModule } from './material-imports/material-imports.module';
import { FormsModule } from '@angular/forms';
import { Ej01LoginComponent } from './components/ej01-login/ej01-login.component';
import { Ej02CajaComponent } from './components/ej02-caja/ej02-caja.component';
import { Ej03TablaComponent } from './components/ej03-tabla/ej03-tabla.component';


@NgModule({
  declarations: [
    AppComponent,
    Ej01LoginComponent,
    Ej02CajaComponent,
    Ej03TablaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialImportsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
