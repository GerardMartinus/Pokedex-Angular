import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { Pokemon } from 'src/app/interface/pokemon';
import { PokemonsService } from '../../services/pokemons.service';

@Component({
  selector: 'Pokemons',
  templateUrl: './pokemon-cards.component.html',
  styleUrls: ['./pokemon-cards.component.scss'],
})
export class PokemonCardsComponent implements OnInit, OnDestroy {
  title = 'pokedex';
  pokemons: Pokemon[] = [];
  data: any = [];
  maxPages: number[];
  active = 0;
  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit() {
    this.pokeService
      .getPokemons(0)
      .pipe(take(1))
      .subscribe((pokemonsList) => {
        this.data = pokemonsList;
        console.log(this.data);
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
    this.pokeService
      .getPokemons(page)
      .pipe(takeUntil(this.destroy$))
      .subscribe((pokemonsList: any) => {
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  constructor(private pokeService: PokemonsService) {}
}
