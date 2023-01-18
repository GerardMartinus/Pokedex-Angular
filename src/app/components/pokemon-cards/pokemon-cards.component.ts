import { Component, OnInit } from '@angular/core';
import { PokemonsService } from '../../services/pokemons.service';
import { Pokemon } from '../../Interface/pokemon'


@Component({
  selector: 'Pokemons',
  templateUrl: './pokemon-cards.component.html',
  styleUrls: ['./pokemon-cards.component.scss']
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

  constructor(private pokeService: PokemonsService) { }

}
