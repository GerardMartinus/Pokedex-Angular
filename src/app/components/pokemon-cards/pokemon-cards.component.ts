import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { Pokemon } from 'src/app/Interface/pokemon';
import { PokemonsService } from '../../services/pokemons.service';

@Component({
  selector: 'Pokemons',
  templateUrl: './pokemon-cards.component.html',
  styleUrls: ['./pokemon-cards.component.scss'],
})
export class PokemonCardsComponent implements OnInit, OnDestroy {
  selectedId: number | null;

  pokemonType: string;

  shiny(id: number) {
    this.selectedId = id;
  }

  default(id: number) {
    if (this.selectedId == id) {
      this.selectedId = null;
    }
  }
  title = 'pokedex';
  pokemons: Pokemon[] = [];
  data: any = [];
  maxPages: number[];
  active = 0;
  destroy$: Subject<boolean> = new Subject<boolean>();
  colorsList: any[] = [];

  ngOnInit() {
    this.pokeService
      .getPokemons(0)
      .pipe(take(1))
      .subscribe((pokemonsList) => {
        this.data = pokemonsList;
        this.maxPages = Array.from(
          Array(Math.trunc(this.data.count / 20)).keys()
        );
        this.data.results.map((pokemon: Pokemon) => {
          this.pokeService
            .getPokemonInfo(pokemon.name)
            .subscribe((pokemon: Pokemon) => {
              this.pokeService
                .getPokemonColor(pokemon.species.url)
                .subscribe((req: any) => this.colorsList.push(req.color.name));
              this.pokemons.push(pokemon);

              this.pokemonType = pokemon.types[0].type.name;

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

  constructor(private pokeService: PokemonsService) { }
}
