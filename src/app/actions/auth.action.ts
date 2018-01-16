import { type } from '../utils/type.util';
import { Action } from '@ngrx/store';
import { Quote } from '../domain/quote.model';
import { Auth } from '../domain/auth.model';
import { User } from '../domain';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes = {
  LOGIN:           type('[Auth] login'),
  LOGIN_SUCCESS:   type('[Auth] login Success'),
  LOGIN_FAIL:      type('[Auth] login Fail'),
  REGISTER:               type('[Auth] Register'),
  REGISTER_SUCCESS:       type('[Auth] Register Success'),
  REGISTER_FAIL:          type('[Auth] Register Fail'),
  LOGOUT:          type('[Auth] Logout'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class LoginAction implements Action {
  type = ActionTypes.LOGIN;

  constructor(public payload: {email: string, password: string}) { }
}

export class LoginSucsessAction implements Action {
  type = ActionTypes.LOGIN_SUCCESS;

  constructor(public payload: Auth) { }
}

export class LoginFailAction implements Action {
  type = ActionTypes.LOGIN_FAIL;

  constructor(public payload: string) { }
}

export class RegisterAction implements Action {
  type = ActionTypes.REGISTER;

  constructor(public payload: User) { }
}

export class RegisterSucsessAction implements Action {
  type = ActionTypes.REGISTER_SUCCESS;

  constructor(public payload: Auth) { }
}

export class RegisterFailAction implements Action {
  type = ActionTypes.REGISTER_FAIL;

  constructor(public payload: string) { }
}

export class LogoutAction implements Action {
  type = ActionTypes.LOGOUT;

  constructor(public payload: null) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = LoginAction
  | LoginSucsessAction
  | LoginFailAction
  | RegisterAction
  | RegisterSucsessAction
  | RegisterFailAction
  | LogoutAction;
