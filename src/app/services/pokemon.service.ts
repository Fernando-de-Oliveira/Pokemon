import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable(
  {providedIn: 'root'}
)
export class PokemonService {
  types = ["bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "fire",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychic",
  "rock",
  "steel",
  "water"]
constructor(
  private http: HttpClient
) { }


  getAll(): Observable<any> {
    return this.http.get(`${environment.pokeapi}pokemon/?limit=100`);
  }

  getByName(name: string) {
    return this.http.get(`${environment.pokeapi}pokemon/${name}`);
  }

  getByType(type: string): Observable<any> {
    return this.http.get(`${environment.pokeapi}type/${type}`);
  }
}
