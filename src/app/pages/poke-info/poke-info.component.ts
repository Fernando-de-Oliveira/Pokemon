import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
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
  imgTypes = [
    {
      id: 0,
      name:'front_default'
    },
    {
      id: 1,
      name:'front_shiny'
    },
    {
      id: 2,
      name:'front_female'
    },
    {
      id: 3,
      name:'front_shiny_female'
    }
  ]
  idGen = 0
  constructor(
    private pokemon: PokemonService,
    private handle: HandleService) {}

  ngOnInit(): void {
    this.subscription.add(this.getPokemon());
  }

  getPokemon(): Subscription{
    this.idGen = 0
    return this.handle.pokemonSelected().pipe(
      tap(name => console.log(name)),
      switchMap((name: string) => this.pokemon.getByName(name)))
      .subscribe(pokemon => this.pokemonInfo = pokemon);
  }

  changeImg() {
    this.idGen === 3 ? this.idGen = 0 : this.idGen++;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
