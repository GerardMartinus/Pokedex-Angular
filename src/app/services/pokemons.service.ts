import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokeRequisition } from '../interface/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  getPokemons(page: number): Observable<PokeRequisition[]> {
    return this.http.get<PokeRequisition[]>(
      `${this.apiUrl}/pokemon/?offset=${page * 2 * 10}&limit=20`
    );
  }

  getPokemonInfo(pokemon: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pokemon/${pokemon}`);
  }

  constructor(private http: HttpClient) {}
}
