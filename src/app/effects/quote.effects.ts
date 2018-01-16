import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import * as actions from '../actions/quote.action'
import { QuoteService } from '../services/quote.service';

@Injectable() 
export class QuoteEffects { // 这个effect是为了处理Load这个参数

  @Effect()
  quote$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOAD) // 筛选 quote里面的LOAD
    .map(toPayload)
    .switchMap(_ => this.service$.getQuote()
      .map(q => new actions.LoadSucsessAction(q))
      .catch(err => Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
    );

  constructor(private actions$: Actions, private service$: QuoteService) { }
}