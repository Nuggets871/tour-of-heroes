import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component'; // <--- Import du composant

// Gère ici les redirections avec le chemin et le composant lié
const routes: Routes = [
  {
    path: 'heroes', component: HeroesComponent // <-- route /heroes qui affiche les Heroes 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
