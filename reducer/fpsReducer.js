import {FETCH_FPS, EDIT_FPS, ADD_FPS} from '../action/type';

export const init = {
  footprints: 're',
  user: null, //current user
  loaded: false, //current auth
  error: false,  //post or fetch error
  newFootPrint: {
    username: 'Charlene',
    date: new Date(),
    place:'',
    city: '',
    country:'',
    des:'',
    url:''
  },
  readPostState: {
    open: false,
    id: null
  }
};

export function footprintReducer(state = init.footprints, action) {
  switch(action.type) {
    case FETCH_FPS : {
      return action.footprints;
    }
    default : return state
  }
}

export function editReducer(state = init.newFootPrint, action) {
  switch(action.type) {
    case EDIT_FPS: {
      return action.newFootPrint
    }
    default: return state
  }
}

export function addReducer(state = init.error, action) {
  switch(action.type) {
    case ADD_FPS: {
      return action.error
    }
    default: return state
  }
}