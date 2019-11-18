import { combineReducers } from 'redux';
import {footprintReducer, editReducer, addReducer} from './fpsReducer';

const rootReducer = combineReducers({
footprints: footprintReducer,
newFootPrint: editReducer,
error: addReducer,
});

export default rootReducer;