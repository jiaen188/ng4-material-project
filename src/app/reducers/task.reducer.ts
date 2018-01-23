import * as actions from '../actions/task.action';
import * as prjActions from '../actions/project.action';
import { Project } from '../domain/project.model';
import { Task } from '../domain/task.model';
import * as _ from 'lodash';
import { createSelector } from 'reselect';

export interface State {
  ids: string[];
  entities: { [id: string]: Task };
};

export const initialState: State = {
  ids: [],
  entities: {},
};

const addTask = (state, action) => {
  const task = action.payload;
  if (state.entities[task.id]) { // 如果我传进来的，task的id已经在entities的key有值了，那说明已经存在这个task.id 作为key
    return state;                    // 我们直接返回原来的state就可以了
  }
  const newIds = [...state.ids, task.id];
  const newEntities = { ...state.entities, [task.id]: task }; // 添加id对应的task
  return { ...state, ids: newIds, entities: newEntities };
}

const updateTask = (state, action) => {
  const task = action.payload;
  const newEntities = { ...state.entities, [task.id]: task };
  return { ...state, entities: newEntities };
}

const deleteTask = (state, action) => {
  const task = action.payload;
  const newIds = state.ids.filter(id => id !== task.id);
  const newEntities = newIds.reduce((entities, id: string) => ({ ...entities, [id]: state.entities[id] }), {}); // 生成taskid作为key，task作为value的新对象
  return {
    ids: newIds,
    entities: newEntities,
  };
}

const loadTasks = (state, action) => {// loadtask的时候，传进来的是task的数组，
  const tasks = action.payload;
  const incomingIds = tasks.map(p => p.id);
  const newIds = _.difference(incomingIds, state.ids);  // 比较原来的task数组的id数组，和传进来的task数组的id数组，把不同的id放到一个数组中
  const incomingEntities = _.chain(tasks)
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

const moveAllTasks = (state, action) => {
  const tasks = <Task[]>action.payload;
  const updatedEntities = tasks.reduce((entities, task) => ({...entities, [task.id]: task}), {});

  return {
    ...state,
    entities: {...state.entities, ...updatedEntities}
  };
}

const delByPrj = (state, action) => {
  const project = <Project>action.payload;
  const taskListIds = project.taskLists;
  const remainingIds = state.ids.filter(id => taskListIds.indexOf(state.entities[id].taskListIds) === -1);
  const remainingEntities = remainingIds.reduce((entities, id) => ({...entities, [id]: state.entities[id]}), {});

  return {
    ids: [...remainingIds],
    entities: remainingEntities,
  };
}

// reducer其实是可以接收所有的action
// 这里我们还要处理一些project的action 比如，选择project， 删除project
export function reducer(state = initialState, action: actions.Actions): State { 
  switch (action.type) {
    case actions.ActionTypes.ADD_SUCCESS: {
      return addTask(state, action);
    }
    case actions.ActionTypes.DELETE_SUCCESS: {
      return deleteTask(state, action);
    }
    case actions.ActionTypes.COMPLETE_SUCCESS:
    case actions.ActionTypes.MOVE_SUCCESS:
    case actions.ActionTypes.UPDATE_SUCCESS: {
      return updateTask(state, action);
    }
    case actions.ActionTypes.LOAD_SUCCESS: { // load的时候，传进来的是task的数组
      return loadTasks(state, action);
    }
    case actions.ActionTypes.MOVE_ALL_SUCCESS: {
      return moveAllTasks(state, action);
    }
    case prjActions.ActionTypes.DELETE_SUCCESS: { // 处理project的delete_project的action
      return delByPrj(state, action); 
    }

    default: {
      return state;
    }
  }
}

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;

// 最终得到task的数组
export const getTasks = createSelector(getIds, getEntities, (ids, entities) => {
  return ids.map(id => entities[id]);
});