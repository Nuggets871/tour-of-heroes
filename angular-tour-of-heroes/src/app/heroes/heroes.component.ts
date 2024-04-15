import { Component } from '@angular/core';
import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
  
})
export class HeroesComponent {
  heroes: Hero[] = [];
  selectedHero?:Hero;

  constructor(
    private heroService: HeroService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }  

  onSelect(hero: Hero){
    this.selectedHero = hero;
    this.messageService.add(`HeroComponent: Selected hero id=${hero.id}`)
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

}
