import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListadoGasolinerasComponent } from './components/listado-gasolineras/listado-gasolineras.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialImportsModule } from './material-imports/material-imports.module';
import { UnaGasolineraComponent } from './components/una-gasolinera/una-gasolinera.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GasolinerasMapComponent } from './components/gasolineras-map/gasolineras-map.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    AppComponent,
    ListadoGasolinerasComponent,
    UnaGasolineraComponent,
    GasolinerasMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    MaterialImportsModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
