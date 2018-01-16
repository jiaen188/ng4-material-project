import * as actions from '../actions/quote.action';
import { Quote } from '../domain';

export interface State {
  quote: Quote;
};

export const initialState: State = {
  quote: {
    cn: '满足感在于不断的努力，而不是现有成就感。全心全意努力定会胜利满满',
    en: 'Satisfaction lies in the effort , not in the attainment. Full effort is full victory',
    pic: '/assets/img/quote_fallback.jpg'
  }
};

// reduce 是纯函数 （接受一个状态，返回一个新的状态）
export function reducer(state = initialState, action: actions.Actions ): State {
  switch (action.type) {
    case actions.ActionTypes.LOAD_SUCCESS: {
      return {...state, quote: <Quote>action.payload}; // 不会改变原来的state， 只会返回一个新的state
      // 上面的写法相当于 Object.assign({}, state, {quote: action.payload});
    }
    case actions.ActionTypes.LOAD_FAIL: 
    default: {
      return state;
    }
  }
}

export const getQuote = (state: State) => state.quote;