import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoGasolinerasComponent } from './components/listado-gasolineras/listado-gasolineras.component';

const routes: Routes = [
  {path: '', component: ListadoGasolinerasComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
