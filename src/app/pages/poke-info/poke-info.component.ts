import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import * as EventEmitter from 'events';
import { Subscription, Observable } from 'rxjs';
import { map, mergeMap, switchMap, switchMapTo, take, tap } from 'rxjs/operators';
import { HandleService } from 'src/app/services/handle.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-info',
  templateUrl: './poke-info.component.html',
  styleUrls: ['./poke-info.component.scss']
})
export class PokeInfoComponent implements OnInit, OnDestroy {
  pokeImgs: Array<any>;
  subscription: Subscription = new Subscription();
  pokemonInfo: any;

  constructor(
    private pokemon: PokemonService,
    private handle: HandleService) {}

  ngOnInit(): void {
    this.subscription.add(this.getPokemon());
  }

  getPokemon(): Subscription{
    return this.handle.pokemonSelected().pipe(
      tap(name => console.log(name)),
      mergeMap((name: string) => this.pokemon.getByName(name)))
      .subscribe(pokemon => this.pokemonInfo = pokemon);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
