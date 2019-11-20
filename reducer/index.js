import { combineReducers } from 'redux';
import {footprintReducer, selectReducer, addReducer} from './fpsReducer';

const rootReducer = combineReducers({
footprints: footprintReducer,
currentFP: selectReducer,
error: addReducer,
});

export default rootReducer;