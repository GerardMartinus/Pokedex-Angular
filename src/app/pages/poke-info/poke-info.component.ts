import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Pokemon } from 'src/app/interface/pokemon';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-poke-info',
  templateUrl: './poke-info.component.html',
  styleUrls: ['./poke-info.component.scss'],
})
export class PokeInfoComponent implements OnInit {
  pokemon: Pokemon;

  ngOnInit(): void {
    this.pokeService
      .getPokemonInfo('pikachu')
      .pipe(take(1))
      .subscribe((pokemon) => (this.pokemon = pokemon));
  }

  constructor(private pokeService: PokemonsService) {}
}
