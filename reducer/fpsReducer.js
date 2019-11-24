import {FETCH_FPS, EDIT_FP, ADD_FP, SELECT_FP, DEL_FP, GET_URL, UPLOAD_ERR} from '../action/type';

export const init = {
  footprints: [], //array
  user: null, //current user
  loaded: false, //current auth
  error: false,  //post or fetch error
  currentFP: {
    id: '',
    username: '',
    uid: '',
    travelDate: new Date(),
    title:'',
    city: '',
    country:'',
    des:'',
    urls:[]
  },
  uploadErr: null,
  imgUrl: '',
};

export function getUploadStatus(state= init.uploadErr, action) {
  switch(action.type) {
    case UPLOAD_ERR: {
    return action.uploadErr;
   }
  default: return state
  }
}

export function getDownloadUrl(state= init.imgUrl, action) {
  switch(action.type) {
    case GET_URL: {
      return action.imgUrl;
    }
    default: return state
  }
}

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