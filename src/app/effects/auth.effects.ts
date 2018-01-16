import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import * as actions from '../actions/auth.action'
import { AuthService } from '../services/auth.service';
import { User } from '../domain';

@Injectable()
export class AuthEffects { // 这个effect是为了处理Load这个参数

  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGIN) // 筛选 login里面的LOGIN
    .map(toPayload)
    .switchMap(({ email, password }) => this.service$.login(email, password)
      .map(auth => new actions.LoginSucsessAction(auth))
      .catch(err => Observable.of(new actions.LoginFailAction(JSON.stringify(err))))
    );

  @Effect()
  register$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.REGISTER) // 筛选 register里面的REGISTER
    .map(toPayload)
    .switchMap((user: User) => this.service$.register(user)
      .map(auth => new actions.RegisterSucsessAction(auth))
      .catch(err => Observable.of(new actions.RegisterFailAction(JSON.stringify(err))))
    );

  @Effect()
  logout$: Observable<Action> = this.actions$ // 退出后跳转到 主页面
    .ofType(actions.ActionTypes.LOGOUT) // 筛选 logout里面的LOGOUT
    .map(_ => go(['/']));

  @Effect()
  loginAndNavigate$: Observable<Action> = this.actions$ // 登录成功后 跳转到 projects 页面 
    .ofType(actions.ActionTypes.LOGIN_SUCCESS) // 筛选 login里面的LOGIN
    .map(_ => go(['/projects']));

  @Effect()
  registerAndNavigate$: Observable<Action> = this.actions$ // 注册成功后 跳转到 projects 页面
    .ofType(actions.ActionTypes.REGISTER_SUCCESS) // 筛选 logout里面的REGISTER
    .map(_ => go(['/projects']));

  constructor(private actions$: Actions, private service$: AuthService) { }
}