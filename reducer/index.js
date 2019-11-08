import { combineReducers } from 'redux';
import footprintReducer from './fpsReducer';

const rootReducer = combineReducers({
footprints: footprintReducer
});

export default rootReducer;