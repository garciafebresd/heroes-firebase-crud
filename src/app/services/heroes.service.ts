import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroModel } from '../models/hero.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://login-firebase-a88a9.firebaseio.com';
  constructor(private httpClient: HttpClient) { }

  selectHero() {

  }

  selectHeroes() {

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

  delete() {

  }
}
