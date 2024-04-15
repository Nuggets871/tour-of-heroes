import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes'; // URL to the web api

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) { }

  // getHeroes(): Hero[]{
  //   return HEROES;
  // }

  // getHeroes(): Observable<Hero[]>{
  //   const heroes = of(HEROES);
  //   this.messageService.add('HeroService: fetched heroes');
  //   return heroes;
  // }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(h => h.id === id)!;
    // le ! permet de dire que (h => h.id === id) ne sera jamais nul
    this.messageService.add(`HeroService: fetched hero id=${hero.id}`);
    return of(hero);
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }
}
