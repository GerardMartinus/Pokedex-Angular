import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, take } from 'rxjs';
import { Pokemon, PokeRequisition } from 'src/app/Interface/pokemon';
import { PokemonsService } from '../../services/pokemons.service';

@Component({
  selector: 'Pokemons',
  templateUrl: './pokemon-cards.component.html',
  styleUrls: ['./pokemon-cards.component.scss'],
})
export class PokemonCardsComponent implements OnInit, OnDestroy {
  selectedId: number[] = [];
  title = 'pokedex';
  pokemons: Pokemon[] = [];
  data: PokeRequisition;
  maxPages: number[];
  active = 0;
  destroy$: Subject<boolean> = new Subject<boolean>();
  pokemonType: string;

  shiny(id: number) {
    this.selectedId!.push(id);
  }

  default(id: number) {
    if (this.selectedId.includes(id)) {
      for (let i = 0; i < this.selectedId.length; i++) {
        if (this.selectedId[i] === id) {
          this.selectedId.splice(i, 1);
        }
      }
    }
  }

  getPokeInfo(page: number) {
    this.pokeService
      .getPokemons(page)
      .pipe(take(1))
      .subscribe((pokemonsList: PokeRequisition) => {
        this.data = pokemonsList;
        this.maxPages = Array.from(
          Array(Math.trunc(this.data.count / 20)).keys()
        );
        this.data.results.map((pokemon) => {
          this.pokeService
            .getPokemonInfo(pokemon.name)
            .subscribe((pokemon: Pokemon) => {
              this.pokemons.push(pokemon);
              this.pokemonType = pokemon.types[0].type.name;
            });
        });
      });
  }

  ngOnInit() {
    this.getPokeInfo(0);
  }

  changePage(page: number) {
    this.pokemons = [];
    this.active = page;
    this.getPokeInfo(page);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  constructor(private pokeService: PokemonsService) {}
}
