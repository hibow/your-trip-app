import { combineReducers } from 'redux';
import {footprintReducer, selectReducer, addReducer} from './fpsReducer';
import {curuserReducer, curauthReducer} from './authReducer';
const rootReducer = combineReducers({
footprints: footprintReducer,
currentFP: selectReducer,
error: addReducer,
user: curuserReducer,
loaded: curauthReducer
});

export default rootReducer;