import {FETCH_FPS} from '../action/type';

const init = {
  footprints: 'u'
};

function footprintReducer(state = init.footprints, action) {
  switch(action.type) {
    case FETCH_FPS : {
      return action.footprints
    }
    default : return state
  }
}

export default footprintReducer;