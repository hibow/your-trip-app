import {SET_USER, SET_AUTH} from '../action/type';

const init = {
  user: null,
  loaded: false
};

export const curuserReducer= (state = null, action) => {
  switch(action.type) {
    case SET_USER: {
      return action.user
    }
    default : return state
  }
}
export const curauthReducer = (state = false, action) => {
  switch(action.type) {
    case SET_AUTH: {
      return action.loaded
    }
    default : return state
  }
}
