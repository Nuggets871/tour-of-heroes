import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component'; // <--- Import du composant
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';


// Gère ici les redirections avec le chemin et le composant lié
const routes: Routes = [
  {
    path: '', redirectTo: '/dashboard', pathMatch: 'full'
  },
  {
    path: 'heroes', component: HeroesComponent // <-- route /heroes qui affiche les Heroes 
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'detail/:id', component: HeroDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
