import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';

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
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('feteched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes',[]))
      );
  }

  handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {

      console.log(error);

      this.log(`${operation} failed : ${error.message}`)

      return of(result as T);
    }
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`
    // le ! permet de dire que (h => h.id === id) ne sera jamais nul
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id =${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }

  updateHero(hero :Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      )
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json'})
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      )
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`

    return this.http.delete<Hero>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deletedHero'))
      )
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(x => x.length ?
          this.log(`found heroes martching "${term}"`) : 
          this.log(`no heroes found matching "${term}"`)
        ),
        catchError(this.handleError<Hero[]>('searchHero', [])),
      );
  }
}
