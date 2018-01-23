import { NgModule } from '@angular/core';
import { StoreModule, combineReducers, ActionReducer } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core/compose';
import { createSelector } from 'reselect';

import * as fromQuote from './quote.reducer';
import * as fromAuth from './auth.reducer';
import * as fromProject from './project.reducer';
import * as fromTaskList from './task-list.reducer';
import * as fromTask from './task.reducer';
import * as fromUser from './User.reducer';

import { environment } from '../../environments/environment';
import { Auth } from '../domain/auth.model';

export interface State { // 定义一个全局的state 把reduceers文件夹下，所有新增的 state都存放在这
  quote: fromQuote.State,
  auth: Auth,
  projects: fromProject.State,
  taskLists: fromTaskList.State,
  tasks: fromTask.State,
  users: fromUser.State,
};

const initialState: State = { //定义全局的初始值initialState 把reducers文件夹下， 所有的初始化  initialState 放这
  quote: fromQuote.initialState,
  auth: fromAuth.initialState,
  projects: fromProject.initialState,
  taskLists: fromTaskList.initialState,
  tasks: fromTask.initialState,
  users: fromUser.initialState,
};

const reducers = { //定义一个全局的reducers 导入所有的各自xx.reducer.ts下的  reducer
  quote: fromQuote.reducer,
  auth: fromAuth.reducer,
  projects: fromProject.reducer,
  taskLists: fromTaskList.reducer,
  tasks: fromTask.reducer,
  users: fromUser.reducer,
};

const productionReducers: ActionReducer<State> = combineReducers(reducers); // 将reducer合并, 为生产环境准备的reducers
const developmentReducers: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers); // 为开发环境准备
// 同这种写法combineReducers(storeFreeze(reducers));
// 当我们在 开发环境的时候，如果我们不小心改变了原有的 state，为了冻结store，方便我们观察
// compose 能将第一个函数作为第二个函数的参数传入

export function reducer(state = initialState, action: any): State {
  return environment.production ? productionReducers(state, action) : developmentReducers(state, action);
}

export const getQuoteState = (state: State) => state.quote;
export const getAuthState = (state: State) => state.auth; // 获取全局对象中的 auth
export const getProjectState = (state: State) => state.projects; // 获取全局对象中的 auth
export const getTaskListState = (state: State) => state.taskLists;
export const getTaskState = (state: State) => state.tasks;
export const getUserState = (state: State) => state.users;

export const getQuote = createSelector(getQuoteState, fromQuote.getQuote);
// createSelector具有记忆功能，如果下次请求的参数，和上一次的参数相同，就会直接从内存中取
// 只有最后一个参数是作为函数，前面其他的所有函数参数，都会调用后将返回的值作为参数，作为最后一个函数参数的传入值

export const getProjects = createSelector(getProjectState, fromProject.getAll);
export const getTaskLists = createSelector(getTaskListState, fromTaskList.getSelected);
export const getTasks = createSelector(getTaskState, fromTask.getTasks);
export const getUsers = createSelector(getUserState, fromUser.getUsers);

export const getUserEntities = createSelector(getUserState, fromUser.getEntities);
export const getTasksWithOwners = createSelector(getTasks, getUserEntities, (tasks, userEntities) => {
  return tasks.map(task => {
    return {
      ...task,
      owner: userEntities[task.ownerId],
      participants: task.participantIds.map(id => userEntities[id])
    };
  });
});

export const getTaskByList = createSelector(getTaskLists, getTasksWithOwners, (lists, tasks) => {
  return lists.map(list => {
    return {
      ...list,
      tasks: tasks.filter(task => task.taskListId === list.id)
    };
  });
});

// 动态创建一个selector，用工厂函数的方法
export const getProjectUsers = (projectId: string) => createSelector(getProjectState, getUserEntities, (state, entities) => {
  return state.entities[projectId].members.map(id => entities[id]);
});

@NgModule({
  imports: [
    StoreModule.provideStore(reducer), // 用静态工厂方法导入
    RouterStoreModule.connectRouter(), // 用静态方法导入
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
  ]
})
export class AppStoreModule { }