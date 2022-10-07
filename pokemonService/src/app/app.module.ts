import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TablaPokemonComponent } from './components/tabla-pokemon/tabla-pokemon.component';
import { MaterialImportsModule } from './material-imports/material-imports.module';
import { PokemonInfoDialogComponent } from './components/pokemon-info-dialog/pokemon-info-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TablaPokemonComponent,
    PokemonInfoDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialImportsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
