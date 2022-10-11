import { EventEmitter, Injectable, Injector } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HandleService {
  public pokemonSelectedEmitter = new BehaviorSubject<boolean>(undefined);

  constructor(
    injector: Injector
  ) {}

  notifyPokemonSelected(name): void {

    this.pokemonSelectedEmitter.next(name);
  }

  pokemonSelected(): Observable<any> {
    return this.pokemonSelectedEmitter.asObservable();
  }

}




