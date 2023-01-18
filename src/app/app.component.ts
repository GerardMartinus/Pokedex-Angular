import { Component, OnInit } from '@angular/core';
import { PokemonsService } from './services/pokemons.service';

interface Pokemon {
  name: string;
  sprites: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
  };
  types: [{ type: { name: string } }];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pokedex';
  pokemons: Pokemon[] = [];
  data: any = [];
  maxPages: number[];
  active = 0;

  ngOnInit() {
    this.pokeService.getPokemons(0).subscribe((pokemonsList: any) => {
      this.data = pokemonsList;
      this.maxPages = Array.from(
        Array(Math.trunc(this.data.count / 20)).keys()
      );
      this.data.results.map((pokemon: { name: string; url: string }) => {
        this.pokeService.getPokemonInfo(pokemon.name).subscribe((pokemon) => {
          this.pokemons.push(pokemon);
          console.log(pokemon);
        });
      });
    });
  }

  changePage(page: number) {
    this.pokemons = [];
    this.active = page;
    this.pokeService.getPokemons(page).subscribe((pokemonsList: any) => {
      this.data = pokemonsList;
      this.maxPages = Array.from(
        Array(Math.trunc(this.data.count / 20)).keys()
      );
      this.data.results.map((pokemon: { name: string; url: string }) => {
        this.pokeService.getPokemonInfo(pokemon.name).subscribe((pokemon) => {
          this.pokemons.push(pokemon);
          console.log(pokemon);
        });
      });
    });
  }

  constructor(private pokeService: PokemonsService) {}
}
