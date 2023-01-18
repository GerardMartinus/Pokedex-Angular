import { Component, OnInit } from '@angular/core';
import { PokemonsService } from './services/pokemons.service';

interface Pokemon {
  species: { name: string };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pokedex';
  pokemons: Pokemon[] = [];

  ngOnInit() {
    let data: any = [];
    this.pokeService.getPokemons().subscribe((pokemonsList: any) => {
      data = pokemonsList.results;
      data.map((pokemon: { name: string; url: string }) => {
        this.pokeService
          .getPokemonInfo(pokemon.name)
          .subscribe((pokemon) => this.pokemons.push(pokemon));
      });
    });
  }

  constructor(private pokeService: PokemonsService) {}
}
