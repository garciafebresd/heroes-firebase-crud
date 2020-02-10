import { Component, OnInit } from '@angular/core';
import { HeroModel } from '../../models/hero.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  hero: HeroModel = new HeroModel();

  constructor(private heroesService: HeroesService) { }

  ngOnInit() {
  }

  save(form: NgForm) {

    if (form.invalid) {
      console.log('formulario no valido');
      return;
    }

    // console.log(form);
    // console.log(this.hero);

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let request: Observable<any>;

    if (this.hero.id) {
      request = this.heroesService.update(this.hero);
    } else {
      request = this.heroesService.create(this.hero);
    }

    request.subscribe((response) => {
      Swal.fire({
        title: this.hero.name,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });
    });
  }

  alive() {
    if (this.hero.alive === true) {
      this.hero.alive = false;
    } else {
      this.hero.alive = true;
    }
  }

}
