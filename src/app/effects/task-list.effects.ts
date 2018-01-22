import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import * as actions from '../actions/task-list.action'
import { User } from '../domain';
import * as fromRoot from '../reducers';
import { TaskListService } from '../services/task-list.service';

@Injectable()
export class TaskListEffects { // 这个effect是为了处理PROJECT这个参数

  @Effect()
  loadTaskLists$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOAD) // 筛选 taskList里面的LOAD
    .map(toPayload)                                           
    .switchMap((projectId) => this.service$.get(projectId) 
      .map(taskLists => new actions.LoadSuccessAction(taskLists))
      .catch(err => Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
  );

  @Effect()
  addTaskList$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ADD) // 筛选 taskList里面的ADD
    .map(toPayload)
    .debug('add taskList')
    .switchMap(taskList => this.service$.add(taskList)
      .map(task_list => new actions.AddSuccessAction(task_list))
      .catch(err => Observable.of(new actions.AddFailAction(JSON.stringify(err)))
    ));

  @Effect()
  updateTaskList$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.UPDATE) // 筛选 taskList里面的UPDATE
    .map(toPayload)
    .switchMap(taskList => this.service$.update(taskList)
      .map(task_list => new actions.UpdateSuccessAction(task_list))
      .catch(err => Observable.of(new actions.UpdateFailAction(JSON.stringify(err))))
    );

  @Effect()
  deleteTaskList$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.DELETE)
    .map(toPayload)
    .switchMap(taskList => this.service$.del(taskList)
      .map(task_list => new actions.DeleteSuccessAction(task_list))
      .catch(err => Observable.of(new actions.DeleteFailAction(JSON.stringify(err))))
    );

  @Effect()
  swap$: Observable<Action> = this.actions$ 
    .ofType(actions.ActionTypes.SWAP) 
    .map(toPayload)
    .switchMap(({src, target}) => this.service$.swapOrder(src, target)
      .map(taskLists => new actions.SwapSuccessAction(taskLists))
      .catch(err => Observable.of(new actions.SwapFailAction(JSON.stringify(err))))
    );

  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.State>,
    private service$: TaskListService) { }
}