import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import * as actions from '../actions/user.action'
import { User } from '../domain';
import * as fromRoot from '../reducers';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects { 

  @Effect()
  loadUsers$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOAD) // 筛选 user里面的LOAD
    .map(toPayload)                                           
    .switchMap((projectId) => this.service$.getUsersByProject(projectId) //获取project里面的users
      .map(users => new actions.LoadSuccessAction(users))
      .catch(err => Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
  );

  @Effect()
  addUserProjectRef$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ADD) // 筛选 user里面的ADD
    .map(toPayload)
    .switchMap(({user, projectId}) => this.service$.addProjectRef(user, projectId)
      .map(user_ => new actions.AddSuccessAction(user_))
      .catch(err => Observable.of(new actions.AddFailAction(JSON.stringify(err)))
    ));

  @Effect()
  updateUserProjectRef$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.UPDATE) // 筛选 user里面的UPDATE
    .map(toPayload)
    .switchMap(project => this.service$.batchUpdateProjectRef(project)
      .map(users => new actions.UpdateSuccessAction(users))
      .catch(err => Observable.of(new actions.UpdateFailAction(JSON.stringify(err))))
    );

  @Effect()
  delUserProjectRef$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.DELETE)
    .map(toPayload)
    .switchMap(({user, projectId}) => this.service$.removeProjectRef(user, projectId)
      .map(user_ => new actions.DeleteSuccessAction(user_))
      .catch(err => Observable.of(new actions.DeleteFailAction(JSON.stringify(err))))
    );

  @Effect()
  search$: Observable<Action> = this.actions$ 
    .ofType(actions.ActionTypes.SEARCH) 
    .map(toPayload)
    .switchMap((str) => this.service$.searchUsers(str)
      .map(users => new actions.SearchSuccessAction(users))
      .catch(err => Observable.of(new actions.SearchFailAction(JSON.stringify(err))))
    );

  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.State>,
    private service$: UserService) { }
}