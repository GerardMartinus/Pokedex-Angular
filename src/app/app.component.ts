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
        this.pokeService.getPokemonInfo(pokemon.name).subscribe((pokemon) => {
          this.pokemons.push(pokemon);
          console.log(pokemon);
        });
      });
    });
  }

  constructor(private pokeService: PokemonsService) {}
}
