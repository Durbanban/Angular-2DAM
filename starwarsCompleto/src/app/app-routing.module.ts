import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterComponent } from './components/character/character.component';
import { FilmComponent } from './components/film/film.component';
import { LandingComponent } from './components/landing/landing.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlanetComponent } from './components/planet/planet.component';
import { SpeciesComponent } from './components/species/species.component';
import { StarshipComponent } from './components/starship/starship.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';

const routes: Routes = [
  {path: 'landing', component: LandingComponent},
  {path: 'characters', component: CharacterComponent},
  {path: 'films', component: FilmComponent},
  {path: 'planets', component: PlanetComponent},
  {path: 'species', component: SpeciesComponent},
  {path: 'starships', component: StarshipComponent},
  {path: 'vehicles', component: VehicleComponent},
  {path: '', redirectTo: '/landing', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
