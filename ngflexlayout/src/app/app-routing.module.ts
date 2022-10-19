import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PruebaFlexlayoutComponent } from './components/prueba-flexlayout/prueba-flexlayout.component';

const routes: Routes = [
  {path: '', component: PruebaFlexlayoutComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
