import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import rootReducer from '../reducer';

const initStore = initState => {
  return createStore(
    rootReducer ,
    initState,
    applyMiddleware(thunk)
  )
}
export default initStore;
