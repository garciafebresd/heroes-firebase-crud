import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroModel } from '../models/hero.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://login-firebase-a88a9.firebaseio.com';
  constructor(private httpClient: HttpClient) { }

  getHero(id: string) {

    return this.httpClient.get(`${this.url}/heroes/${id}.json`);

  }

  getHeroes() {

    return this.httpClient.get(`${this.url}/heroes.json`)
      .pipe(
        //ambas lineas son equivalentes
        //map(response => this.formatArrayHeroes(response))
        map(this.formatArrayHeroes),
        delay(1500)
      );

  }

  formatArrayHeroes(heroesObject: object) {

    const heroes: HeroModel[] = [];
    if (heroesObject === null) {
      return [];
    }

    Object.keys(heroesObject).forEach(key => {
      //breaking reference relationship
      const hero: HeroModel = heroesObject[key];
      hero.id = key;
      heroes.push(hero);
    });

    return heroes;

  }

  create(hero: HeroModel) {

    return this.httpClient.post(`${this.url}/heroes.json`, hero)
      .pipe(
        map((response: any) => {
          hero.id = response.name;
          return hero;
        })
      );
  }

  update(hero: HeroModel) {

    //using Spread operator
    //breaking reference relationship
    const heroUpdate = { ...hero };

    //delete hero.id property
    delete heroUpdate.id;

    return this.httpClient.put(`${this.url}/heroes/${hero.id}.json`, heroUpdate);
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.url}/heroes/${id}.json`);
  }
}
