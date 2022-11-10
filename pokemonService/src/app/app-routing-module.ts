import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonParentComponent } from './components/pokemon-parent/pokemon-parent.component';

const routes: Routes = [
    {path: '', component: PokemonParentComponent, pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  