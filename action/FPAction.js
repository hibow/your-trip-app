import {fs} from '../firebase/index'; //firestore
import {FETCH_FPS} from './type';


export const addFootPrints = () => async dispatch => {
 // const db = await fb;
 // db.
}
//async await is required here
export const fetchFootPrints = (user) => async dispatch =>{
  const db = await fs;
  let newState = {
    footprints : 'new'
  };

  let oldState = {
    footprints: 'err'
  }
  await db.collection('users').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        let fps = doc.data().footprints;
        newState.footprints = fps;
    });
    dispatch({
      type: FETCH_FPS,
      footprints: newState.footprints
    });
    })
    .catch( (err) => {
      dispatch({
        type:FETCH_FPS,
        footprints: oldState.footprints
      })
    })
};
