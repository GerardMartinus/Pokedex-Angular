import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PokeInfoComponent } from './pages/poke-info/poke-info.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/pokemon',
    pathMatch: 'full',
  },
  {
    path: 'pokemon',
    component: HomeComponent,
  },
  {
    path: 'pokemon/:name',
    component: PokeInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
