import { Observable, Subject, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HandleService } from 'src/app/services/handle.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { map, tap, take, mergeMap, switchMap, finalize, mergeAll } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  pokemonsFiltered: Array<any>;
  pokemonSelected: boolean;
  types: Array<string> = this.pokemon.types;

  subscription: Subscription = new Subscription();

  filtered$ = new Subject<string>();
  pokemons$: Observable<any> = this.pokemon.getAll().pipe(map((result) => result.results));

  constructor(
    private pokemon: PokemonService,
    private handle: HandleService) {}

   ngOnInit(): void {
     this.subscription.add(this.filter());
   }

   filter(): Subscription{
    return this.filtered$.pipe(
      switchMap(type => this.pokemon.getByType(type)),
      map(e => e.pokemon)).subscribe(res => {
        this.pokemonsFiltered = res;
      });
   }

  selectPokemon(name: string): void{
    this.pokemonSelected = true;
    this.handle.notifyPokemonSelected(name);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
