import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SamplePipeComponent } from './components/sample-pipe/sample-pipe.component';

const routes: Routes = [
  {path: '', component: SamplePipeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
