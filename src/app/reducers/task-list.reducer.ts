import * as actions from '../actions/task-list.action';
import * as prjActions from '../actions/project.action';
import { Project } from '../domain/project.model';
import { TaskList } from '../domain';
import * as _ from 'lodash';
import { createSelector } from 'reselect';

export interface State {
  ids: string[];
  entities: { [id: string]: TaskList };
  selectedIds: string[] | null;
};

export const initialState: State = {
  ids: [],
  entities: {},
  selectedIds: []
};

const addTaskList = (state, action) => {
  const taskList = action.payload;
  if (state.entities[taskList.id]) { // 如果我传进来的，taskList的id已经在entities的key有值了，那说明已经存在这个taskList.id 作为key
    return state;                    // 我们直接返回原来的state就可以了
  }
  const newIds = [...state.ids, taskList.id];
  const newEntities = { ...state.entities, [taskList.id]: taskList }; // 添加id对应的taskList
  return { ...state, ids: newIds, entities: newEntities };
}

const updateTaskList = (state, action) => {
  const taskList = action.payload;
  const newEntities = { ...state.entities, [taskList.id]: taskList };
  return { ...state, entities: newEntities };
}

const deleteTaskList = (state, action) => {
  const taskList = action.payload;
  const newIds = state.ids.filter(id => id !== taskList.id);
  const newEntities = newIds.reduce((entities, id: string) => ({ ...entities, [id]: state.entities[id] }), {});
  const newSelectedIds = state.selectedIds.filter(id => id !== taskList.id);
  return {
    ids: newIds,
    entities: newEntities,
    selectedIds: newSelectedIds
  };
}

const loadTaskLists = (state, action) => {// loadtaskList的时候，传进来的是taskList的数组，
  const taskLists = action.payload;
  const incomingIds = taskLists.map(p => p.id);
  const newIds = _.difference(incomingIds, state.ids);  // 比较原来的taskList数组的id数组，和传进来的taskList数组的id数组，把不同的id放到一个数组中
  const incomingEntities = _.chain(taskLists)
    .keyBy('id')
    .mapValues(o => o)
    .value();
  const newEntities = newIds.reduce((entities, id: string) => ({ ...entities, [id]: incomingEntities[id] }), {});
  return {
    ...state,
    ids: [...state.ids, ...newIds],
    entities: { ...state.entities, ...newEntities },
  };
}

const swapTaskList = (state, action) => { // 交换顺序其实只是改变了tasklist里面的order
  const taskLists = <TaskList[]>action.payload;
  const updatedEntities = _.chain(taskLists)
    .keyBy('id')
    .mapValues(o => o)
    .value();
  const newEntities = {...state.entities, ...updatedEntities};

  return {
    ...state,
    entities: newEntities
  };
}

const selectPrj = (state, action) => {
  const selected = <Project>action.payload;
  const selectedIds = state.ids.filter(id => state.entities[id].projectId === selected.id); // 找到project的id和taskList的projectId相对应tasklist

  return {
    ...state,
    selectedIds: selectedIds
  };
}

const delListsByPrj = (state, action) => {
  const project = <Project>action.payload;
  const taskListIds = project.taskLists;
  const remainingIds = _.difference(state.ids, taskListIds);
  const remainingEntities = remainingIds.reduce((entities, id) => ({...entities, [id]: state.entities[id]}), {});

  return {
    ids: [...remainingIds],
    entities: remainingEntities,
    selectedIds: []
  };
}

// reducer其实是可以接收所有的action
// 这里我们还要处理一些project的action 比如，选择project， 删除project
export function reducer(state = initialState, action: actions.Actions): State { 
  switch (action.type) {
    case actions.ActionTypes.ADD_SUCCESS: {
      return addTaskList(state, action);
    }
    case actions.ActionTypes.DELETE_SUCCESS: {
      return deleteTaskList(state, action);
    }
    case actions.ActionTypes.UPDATE_SUCCESS: {
      return updateTaskList(state, action);
    }
    case actions.ActionTypes.LOAD_SUCCESS: { // load的时候，传进来的是taskList的数组
      return loadTaskLists(state, action);
    }
    case actions.ActionTypes.SWAP_SUCCESS: {
      return swapTaskList(state, action);
    }
    case prjActions.ActionTypes.SELECT_PROJECT: { // 处理project的select_project的action
      return selectPrj(state, action);
    }
    case prjActions.ActionTypes.DELETE_SUCCESS: { // 处理project的delete_project的action
      return delListsByPrj(state, action); 
    }

    default: {
      return state;
    }
  }
}

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getSelectedIds = (state: State) => state.selectedIds;

// 最终得到taskList的数组
export const getSelected = createSelector(getIds, getEntities, (ids, entities) => {
  return ids.map(id => entities[id]);
});