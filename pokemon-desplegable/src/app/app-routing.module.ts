import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesplegableComponent } from './components/desplegable/desplegable.component';

const routes: Routes = [
  {path: '', component: DesplegableComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
