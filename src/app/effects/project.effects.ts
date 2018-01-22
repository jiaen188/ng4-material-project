import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import * as actions from '../actions/project.action'
import { AuthService } from '../services/auth.service';
import { User } from '../domain';
import { ProjectService } from '../services/project.service';
import * as fromRoot from '../reducers';
import * as TaskListactions from '../actions/task-list.action'

@Injectable()
export class ProjectEffects { // 这个effect是为了处理PROJECT这个参数

  @Effect()
  loadProjects$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOAD) // 筛选 project里面的LOAD
    .map(toPayload)                                             // 需要知道用户的信息，当加载project列表的时候
    .withLatestFrom(this.store$.select(fromRoot.getAuthState)) // 这个操作符是两个流都有了后，前一个流发生了变化才发射
    .switchMap(([_, auth]) => this.service$.get(auth.userId) // 当loading project 流进来后，也要请求用用户的Auth的信息，用userId去获取project数组
      .map(projects => new actions.LoadSuccessAction(projects))
      .catch(err => Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
    );

  @Effect()
  addProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ADD) // 筛选 project里面的ADD
    .map(toPayload)
    .withLatestFrom(this.store$.select(fromRoot.getAuthState)) // 这个操作符是两个流都有了后，前一个流发生了变化才发射
    .switchMap(([project, auth]) => {
      const added = { ...project, members: [`${auth.userId}`] }; // 当添加一个project ，用户本身已经在这个project的members列表中了
      return this.service$.add(added)
        .map(project => new actions.AddSuccessAction(project))
        .catch(err => Observable.of(new actions.AddFailAction(JSON.stringify(err))));
    });

  @Effect()
  updateProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.UPDATE) // 筛选 project里面的UPDATE
    .map(toPayload)
    .switchMap(project => this.service$.update(project)
      .map(projects => new actions.UpdateSuccessAction(projects))
      .catch(err => Observable.of(new actions.UpdateFailAction(JSON.stringify(err))))
    );

  @Effect()
  deleteProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.DELETE)
    .map(toPayload)
    .switchMap(project => this.service$.del(project)
      .map(projects => new actions.DeleteSuccessAction(projects))
      .catch(err => Observable.of(new actions.DeleteFailAction(JSON.stringify(err))))
    );

  @Effect()
  selectProject$: Observable<Action> = this.actions$ 
    .ofType(actions.ActionTypes.SELECT_PROJECT) 
    .map(toPayload)
    .map(project => go([`/tasklists/${project.id}`])); // 传入的是project， 跳转到对应的tasklist列表

  // 对于 select_project 这个action，除了有上面的路由跳转， 还需要有下面的加载对应的tasklists
  @Effect()
  loadTaskLists$: Observable<Action> = this.actions$ 
    .ofType(actions.ActionTypes.SELECT_PROJECT) 
    .map(toPayload)
    .map(project => new TaskListactions.LoadAction(project.id)); 

  @Effect()
  invite$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.INVITE) 
    .map(toPayload)
    .switchMap(({ projectId, members }) => this.service$.invite(projectId, members)
      .map(project => new actions.InviteSuccessAction(project))
      .catch(err => Observable.of(new actions.InviteFailAction(JSON.stringify(err))))
    );

  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.State>,
    private service$: ProjectService) { }
}