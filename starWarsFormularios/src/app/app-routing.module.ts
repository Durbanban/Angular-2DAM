import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterComponent } from './components/character/character.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlanetComponent } from './components/planet/planet.component';
import { SpeciesComponent } from './components/species/species.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { StarshipsComponent } from './components/starships/starships.component';
import { FilmsComponent } from './components/films/films.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';
import { StarShipsDetailComponent } from './components/star-ships-detail/star-ships-detail.component';
import { PlanetDetailsComponent } from './components/planet-details/planet-details.component';
import { SpeciesDetailsComponent } from './components/species-details/species-details.component';
import { FilmDetailsComponent } from './components/film-details/film-details.component';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';
import { NewCharacterComponent } from './components/new-character/new-character.component';
import { EditCharacterComponent } from './components/edit-character/edit-character.component';

  const routes: Routes = [
    {path: 'edit-character/:id', component: EditCharacterComponent},
    {path: 'new-character', component: NewCharacterComponent},
    {path: 'vehicle-details/:id', component: VehicleDetailsComponent},
    {path: 'species-details/:id', component: SpeciesDetailsComponent},
    {path: 'starShip-details/:id' , component: StarShipsDetailComponent},
    {path: 'character-details/:id', component: CharacterDetailsComponent},
    {path: 'film-details/:id', component: FilmDetailsComponent},
    {path: 'planet-details/:id', component: PlanetDetailsComponent},
    {path: 'characters', component: CharacterComponent},
    {path: 'landing',component: LandingPageComponent},
    {path: '', redirectTo:'/landing', pathMatch: 'full'},
    {path: 'planets', component: PlanetComponent},
    {path: 'species', component: SpeciesComponent},
    {path: 'starships', component: StarshipsComponent},
    {path: 'films', component: FilmsComponent},
    {path: 'vehicles', component: VehiclesComponent},
    {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
