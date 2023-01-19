import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'Menu',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
})
export class MenuHeaderComponent {
  onSearch(name: string) {
    this.pokeService
      .getPokemonInfo(name.toLocaleLowerCase())
      .subscribe((pokemon) =>
        this.router.navigateByUrl(`/pokemon/${pokemon.name}`)
      );
  }

  constructor(private pokeService: PokemonsService, private router: Router) {}
}
