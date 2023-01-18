import { Component, OnInit } from '@angular/core';
import { PokemonsService } from '../../services/pokemons.service';
import { Pokemon } from '../../Interface/pokemon'


@Component({
  selector: 'Pokemons',
  templateUrl: './pokemon-cards.component.html',
  styleUrls: ['./pokemon-cards.component.scss'],
})
export class PokemonCardsComponent implements OnInit {

  selectedId: number | null;

  shiny(id: number) {

    this.selectedId = id;

  }

  default(id: number){

    if(this.selectedId = id){
      this.selectedId = null;
    }

  }

  // is_shiny: boolean = false;

  // 
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
