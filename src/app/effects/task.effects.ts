import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import * as actions from '../actions/task.action'
import { User } from '../domain';
import * as fromRoot from '../reducers';
import { TaskService } from '../services/task.service';

@Injectable()
export class TaskEffects { // 这个effect是为了处理PROJECT这个参数

  @Effect()
  loadTasks$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOAD) // 筛选 taskList里面的LOAD
    .map(toPayload)
    .switchMap((taskLists) => this.service$.getByLists(taskLists)
      .map(tasks => new actions.LoadSuccessAction(tasks))
      .catch(err => Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
    );

  @Effect()
  addTask$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ADD) // 筛选 taskList里面的ADD
    .map(toPayload)
    .debug('add taskList')
    .switchMap(task => this.service$.add(task)
      .map(task_ => new actions.AddSuccessAction(task_))
      .catch(err => Observable.of(new actions.AddFailAction(JSON.stringify(err)))
      ));

  @Effect()
  updateTask$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.UPDATE) // 筛选 taskList里面的UPDATE
    .map(toPayload)
    .switchMap(task => this.service$.update(task)
      .map(task_ => new actions.UpdateSuccessAction(task_))
      .catch(err => Observable.of(new actions.UpdateFailAction(JSON.stringify(err))))
    );

  @Effect()
  deleteTask$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.DELETE)
    .map(toPayload)
    .switchMap(task => this.service$.del(task)
      .map(task_ => new actions.DeleteSuccessAction(task_))
      .catch(err => Observable.of(new actions.DeleteFailAction(JSON.stringify(err))))
    );

  @Effect()
  completeTask$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.COMPLETE)
    .map(toPayload)
    .switchMap(task => this.service$.complete(task)
      .map(task_ => new actions.CompleteSuccessAction(task_))
      .catch(err => Observable.of(new actions.CompleteFailAction(JSON.stringify(err))))
    );

  @Effect()
  movep$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.MOVE)
    .map(toPayload)
    .switchMap(({ taskId, taskListId }) => this.service$.move(taskId, taskListId)
      .map(task => new actions.MoveSuccessAction(task))
      .catch(err => Observable.of(new actions.MoveFailAction(JSON.stringify(err))))
    );

  @Effect()
  moveAllp$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.MOVE_ALL)
    .map(toPayload)
    .switchMap(({ taskListId, targetListId }) => this.service$.moveAll(taskListId, targetListId)
      .map(tasks => new actions.MoveAllSuccessAction(tasks))
      .catch(err => Observable.of(new actions.MoveAllFailAction(JSON.stringify(err))))
    );

  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.State>,
    private service$: TaskService) { }
}