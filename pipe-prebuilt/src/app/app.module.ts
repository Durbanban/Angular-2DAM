import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SamplePipeComponent } from './components/sample-pipe/sample-pipe.component';
import { PokemonPhotoPipe } from './pipes/pokemon-photo.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SamplePipeComponent,
    PokemonPhotoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
