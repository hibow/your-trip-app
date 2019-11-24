import { combineReducers } from 'redux';
import {footprintReducer, selectReducer, addReducer, getDownloadUrl, getUploadStatus} from './fpsReducer';
import {curuserReducer, curauthReducer} from './authReducer';
const rootReducer = combineReducers({
footprints: footprintReducer,
currentFP: selectReducer,
error: addReducer,
user: curuserReducer,
loaded: curauthReducer,
uploadErr: getUploadStatus,
imgUrl: getDownloadUrl
});

export default rootReducer;