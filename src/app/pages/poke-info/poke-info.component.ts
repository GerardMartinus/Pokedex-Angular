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
  weight: number;
  height: number;

  // fire = getComputedStyle(document.documentElement).getPropertyValue('--fire')
  // water = getComputedStyle(document.documentElement).getPropertyValue('--water')
  // grass = getComputedStyle(document.documentElement).getPropertyValue('--grass')
  // normal = getComputedStyle(document.documentElement).getPropertyValue('--normal')
  // electric = getComputedStyle(document.documentElement).getPropertyValue('--electric')
  // ice = getComputedStyle(document.documentElement).getPropertyValue('--ice')
  // fighting = getComputedStyle(document.documentElement).getPropertyValue('--fighting')
  // poison = getComputedStyle(document.documentElement).getPropertyValue('--poison')
  // ground = getComputedStyle(document.documentElement).getPropertyValue('--ground')
  // flying = getComputedStyle(document.documentElement).getPropertyValue('--flying')
  // psychic = getComputedStyle(document.documentElement).getPropertyValue('--psychic')
  // bug = getComputedStyle(document.documentElement).getPropertyValue('--bug')
  // rock = getComputedStyle(document.documentElement).getPropertyValue('--rock')
  // ghost = getComputedStyle(document.documentElement).getPropertyValue('--ghost')
  // dark = getComputedStyle(document.documentElement).getPropertyValue('--dark')
  // dragon = getComputedStyle(document.documentElement).getPropertyValue('--dragon')
  // steel = getComputedStyle(document.documentElement).getPropertyValue('--steel')
  // fairy = getComputedStyle(document.documentElement).getPropertyValue('--fairy')

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
      .subscribe((pokemon) => {
        this.height = pokemon.height / 3.281;
        this.weight = pokemon.weight / 2.205;
        this.pokemon = pokemon;
      });
  }

  constructor(
    private pokeService: PokemonsService,
    private route: ActivatedRoute
  ) { }
}
