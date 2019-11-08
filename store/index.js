import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import rootReducer from '../reducer';

const init = {
   footprints: null,
   user: null, //current user
   loaded: false  //current auth
 };
//export error for export const init
const initStore = initState => {
  return createStore(
    rootReducer ,
    initState,
    applyMiddleware(thunk)
  )
}
export default initStore;
