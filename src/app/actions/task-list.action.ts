import { type } from '../utils/type.util';
import { Action } from '@ngrx/store';
import { Quote } from '../domain/quote.model';
import { Auth } from '../domain/auth.model';
import { User, TaskList } from '../domain';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes = { // project 组件，除了增，删，改，查功能， 还有邀请成员功能，  进入工程功能
  ADD:                type('[TaskList] Add'),
  ADD_SUCCESS:        type('[TaskList] Add Success'),
  ADD_FAIL:           type('[TaskList] Add Fail'),
  UPDATE:             type('[TaskList] Update'),
  UPDATE_SUCCESS:     type('[TaskList] Update Success'),
  UPDATE_FAIL:        type('[TaskList] Update Fail'),
  DELETE:                   type('[TaskList] Delete'),
  DELETE_SUCCESS:           type('[TaskList] Delete Success'),
  DELETE_FAIL:              type('[TaskList] Delete Fail'),
  LOAD:                   type('[TaskList] Load'),
  LOAD_SUCCESS:           type('[TaskList] Load Success'),
  LOAD_FAIL:              type('[TaskList] Load Fail'),
  SWAP:                     type('[TaskList] Swap'),
  SWAP_SUCCESS:             type('[TaskList] Swap Success'),
  SWAP_FAIL:                type('[TaskList] Swap Fail'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class AddAction implements Action {
  type = ActionTypes.ADD;

  constructor(public payload: TaskList) { }
}

export class AddSuccessAction implements Action {
  type = ActionTypes.ADD_SUCCESS;

  constructor(public payload: TaskList) { }
}

export class AddFailAction implements Action {
  type = ActionTypes.ADD_FAIL;

  constructor(public payload: string) { }
}

export class UpdateAction implements Action {
  type = ActionTypes.UPDATE;

  constructor(public payload: TaskList) { }
}

export class UpdateSuccessAction implements Action {
  type = ActionTypes.UPDATE_SUCCESS;

  constructor(public payload: TaskList) { }
}

export class UpdateFailAction implements Action {
  type = ActionTypes.UPDATE_FAIL;

  constructor(public payload: string) { }
}

export class DeleteAction implements Action {
  type = ActionTypes.DELETE;

  constructor(public payload: TaskList) { }
}

export class DeleteSuccessAction implements Action {
  type = ActionTypes.DELETE_SUCCESS;

  constructor(public payload: TaskList) { }
}

export class DeleteFailAction implements Action {
  type = ActionTypes.DELETE_FAIL;

  constructor(public payload: string) { }
}

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: string) { }
}

export class LoadSuccessAction implements Action { // load 返回的应该是porject的数组
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: TaskList[]) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: string) { }
}

export class SwapAction implements Action { // 邀请成员，应该指定projectId 和成员数组 members
  type = ActionTypes.SWAP;

  constructor(public payload: { src: TaskList; target: TaskList }) { }
}

export class SwapSuccessAction implements Action {
  type = ActionTypes.SWAP_SUCCESS;

  constructor(public payload: TaskList[]) { }
}

export class SwapFailAction implements Action {
  type = ActionTypes.SWAP_FAIL;

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
  | SwapAction
  | SwapSuccessAction
  | SwapFailAction;
