import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Pokemon } from 'src/app/Interface/pokemon';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-poke-info',
  templateUrl: './poke-info.component.html',
  styleUrls: ['./poke-info.component.scss'],
})
export class PokeInfoComponent implements OnInit {
  pokemon: Pokemon;
  selectedId: number | null;


  shiny(id: number) {
    this.selectedId = id;
  }

  default(id: number) {
    if (this.selectedId == id) {
      this.selectedId = null;
    }
  }

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    this.pokeService
      .getPokemonInfo(name!)
      .pipe(take(1))
      .subscribe((pokemon) => (this.pokemon = pokemon));
  }

  constructor(
    private pokeService: PokemonsService,
    private route: ActivatedRoute
  ) {}
}
