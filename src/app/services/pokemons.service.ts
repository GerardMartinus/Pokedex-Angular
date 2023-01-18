import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface PokemonList {
  name: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  getPokemons(page: number): Observable<PokemonList[]> {
    return this.http.get<PokemonList[]>(
      `${this.apiUrl}/pokemon/?offset=${page * 2 * 10}&limit=20`
    );
  }

  getPokemonInfo(pokemon: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pokemon/${pokemon}`);
  }

  constructor(private http: HttpClient) {}
}
