import * as actions from '../actions/project.action';
import { Project } from '../domain';
import * as _ from 'lodash';
import { createSelector } from 'reselect';

export interface State {
  ids: string[];
  entities: { [id: string]: Project };
  selectedId: string | null;
};

export const initialState: State = {
  ids: [],
  entities: {},
  selectedId: null
};

const addProject = (state, action) => {
  const project = action.payload;
  if (state.entities[project.id]) { // 如果我传进来的，project的id已经在entities的key有值了，那说明已经存在这个project.id 作为key
    return state;                    // 我们直接返回原来的state就可以了
  }
  const newIds = [...state.ids, project.id];
  const newEntities = { ...state.entities, [project.id]: project }; // 添加id对应的project
  return { ...state, ids: newIds, entities: newEntities };
}

const updateProject = (state, action) => {
  const project = action.payload;
  const newEntities = { ...state.entities, [project.id]: project };
  return { ...state, entities: newEntities };
}

const deleteProject = (state, action) => {
  const project = action.payload;
  const newIds = state.ids.filter(id => id !== project.id);
  const newEntities = newIds.reduce((entities, id: string) => ({ ...entities, [id]: state.entities[id] }), {});
  return {
    ids: newIds,
    entities: newEntities,
    selectedId: null
  };
}

const loadProjects = (state, action) => {// loadproject的时候，传进来的是project的数组，
  const projects = action.payload;
  const incomingIds = projects.map(p => p.id);
  const newIds = _.difference(incomingIds, state.ids);  // 比较原来的project数组的id数组，和传进来的project数组的id数组，把不同的id放到一个数组中
  const incomingEntities = _.chain(projects)
    .keyBy('id')
    .mapValues(o => o)
    .value();
  const newEntities = newIds.reduce((entities, id: string) => ({ ...entities, [id]: incomingEntities[id] }), {});
  return {
    ids: [...state.ids, ...newIds],
    entities: { ...state.entities, ...newEntities },
    selectedId: null
  };
}

const selectProject = (state, action) => {
  const project = action.payload;
  
  return { ...state, selectedId: action.payload.id }
}

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.ActionTypes.ADD_SUCCESS: {
      return addProject(state, action);
    }
    case actions.ActionTypes.DELETE_SUCCESS: {
      return deleteProject(state, action);
    }
    case actions.ActionTypes.INVITE_SUCCESS:
    case actions.ActionTypes.UPDATE_SUCCESS: {
      return updateProject(state, action);
    }
    case actions.ActionTypes.LOAD_SUCCESS: { // load的时候，传进来的是project的数组
      return loadProjects(state, action);
    }
    case actions.ActionTypes.SELECT_PROJECT: {
      // return { ...state, selectedId: action.payload.id }; // fixMe 为什么这种写法就不行呢
      return selectProject(state, action);
    }

    default: {
      return state;
    }
  }
}

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getSelectedId = (state: State) => state.selectedId;

// 最终得到project的数组
export const getAll = createSelector(getIds, getEntities, (ids, entities) => {
  return ids.map(id => entities[id]);
});