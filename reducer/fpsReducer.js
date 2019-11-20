import {FETCH_FPS, EDIT_FP, ADD_FP, SELECT_FP, DEL_FP} from '../action/type';

export const init = {
  footprints: [], //array
  user: null, //current user
  loaded: false, //current auth
  error: false,  //post or fetch error
  currentFP: {
    id: '',
    username: 'Charlene',
    travelDate: new Date(),
    title:'',
    city: '',
    country:'',
    des:'',
    urls:[]
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

export function editReducer(state = init.error, action) {
  switch(action.type) {
    case EDIT_FP: {
      return action.error
    }
    default: return state
  }
}

export function addReducer(state = init.error, action) {
  switch(action.type) {
    case ADD_FP: {
      return action.error
    }
    default: return state
  }
}

export function selectReducer(state = init.currentFP, action) {
  switch(action.type) {
    case SELECT_FP: {
      return action.currentFP
    }
    default: return state
  }
}

export function delReducer(state = init.error, action) {
  switch(action.type) {
    case DEL_FP: {
      return action.error
    }
    default: return state
  }
}
//edit, add, delete error didn't update store