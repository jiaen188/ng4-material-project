import { type } from '../utils/type.util';
import { Action } from '@ngrx/store';
import { Quote } from '../domain/quote.model';
import { Auth } from '../domain/auth.model';
import { User, Project } from '../domain';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes = { // project 组件，除了增，删，改，查功能， 还有邀请成员功能，  进入工程功能
  ADD: type('[Project] Add'),
  ADD_SUCCESS: type('[Project] Add Success'),
  ADD_FAIL: type('[Project] Add Fail'),
  UPDATE: type('[Project] Update'),
  UPDATE_SUCCESS: type('[Project] Update Success'),
  UPDATE_FAIL: type('[Project] Update Fail'),
  DELETE: type('[Project] Delete'),
  DELETE_SUCCESS: type('[Project] Delete Success'),
  DELETE_FAIL: type('[Project] Delete Fail'),
  LOAD: type('[Project] Load'),
  LOAD_SUCCESS: type('[Project] Load Success'),
  LOAD_FAIL: type('[Project] Load Fail'),
  SELECT_PROJECT: type('[Project] Select Project'),
  INVITE: type('[Project] Invite'),
  INVITE_SUCCESS: type('[Project] Invite Success'),
  INVITE_FAIL: type('[Project] Invite Fail'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class AddAction implements Action {
  type = ActionTypes.ADD;

  constructor(public payload: Project) { }
}

export class AddSuccessAction implements Action {
  type = ActionTypes.ADD_SUCCESS;

  constructor(public payload: Project) { }
}

export class AddFailAction implements Action {
  type = ActionTypes.ADD_FAIL;

  constructor(public payload: string) { }
}

export class UpdateAction implements Action {
  type = ActionTypes.UPDATE;

  constructor(public payload: Project) { }
}

export class UpdateSuccessAction implements Action {
  type = ActionTypes.UPDATE_SUCCESS;

  constructor(public payload: Project) { }
}

export class UpdateFailAction implements Action {
  type = ActionTypes.UPDATE_FAIL;

  constructor(public payload: string) { }
}

export class DeleteAction implements Action {
  type = ActionTypes.DELETE;

  constructor(public payload: Project) { }
}

export class DeleteSuccessAction implements Action {
  type = ActionTypes.DELETE_SUCCESS;

  constructor(public payload: Project) { }
}

export class DeleteFailAction implements Action {
  type = ActionTypes.DELETE_FAIL;

  constructor(public payload: string) { }
}

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: null) { }
}

export class LoadSuccessAction implements Action { // load 返回的应该是porject的数组
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Project[]) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: string) { }
}

export class SelectProjectAction implements Action {
  type = ActionTypes.SELECT_PROJECT;

  constructor(public payload: Project) { }
}

export class InviteAction implements Action { // 邀请成员，应该指定projectId 和成员数组 members
  type = ActionTypes.INVITE;

  constructor(public payload: { projectId: string; members: User[] }) { }
}

export class InviteSuccessAction implements Action {
  type = ActionTypes.INVITE_SUCCESS;

  constructor(public payload: Project) { }
}

export class InviteFailAction implements Action {
  type = ActionTypes.INVITE_FAIL;

  constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = AddAction
  | AddSuccessAction
  | AddFailAction
  | UpdateAction
  | UpdateSuccessAction
  | UpdateFailAction
  | DeleteAction
  | DeleteSuccessAction
  | DeleteFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | SelectProjectAction
  | InviteAction
  | InviteSuccessAction
  | InviteFailAction;
