import {fs} from '../firebase/index'; //firestore
import {FETCH_FPS, ADD_FP, EDIT_FP, SELECT_FP, DEL_FP} from './type';
import forwardGeo from '../lib/forwardGeo';
import env from '../config';

export const selectFootPrint = (footprint) => async dispatch => {
  let newState = {
    currentFP : {
      id: footprint.id,
      username: footprint.username,
      uid: footprint.uid,
      title: footprint.title,
      travelDate: footprint.travelDate,
      country: footprint.country,
      city: footprint.city,
      urls: [footprint.urls],
      des: footprint.des
    }
  }
  dispatch({
    type: SELECT_FP,
    currentFP: newState.currentFP
  })
}


export const editFootPrint = (footprint) => async dispatch => {
  const db = await fs;
  console.log('edit:',footprint)
  let data = {
      id: footprint.id,
      username: footprint.username,
      uid: footprint.uid,
      title: footprint.title,
      travelDate: footprint.travelDate,
      country: footprint.country,
      city: footprint.city,
      urls: footprint.urls,
      des: footprint.des
    }
  let id = footprint.id;
  await db.collection('footprints').doc(id).update(data)
  .then(() => {
    console.log('update success!')
    dispatch({
      type: EDIT_FP,
      error: false
    })
    dispatch(fetchFootPrints());
  })
  .catch((err) => {
    console.log('update failed!', err)
    dispatch({
      type: EDIT_FP,
      error: true
    })
    dispatch(fetchFootPrints());
  })
}

export const addFootPrints = (footprint) => async dispatch => {
  const db = await fs;

  footprint.position = await forwardGeo({q: `${footprint.title}, ${footprint.city}, ${footprint.country}`, key: env.OPENCAGE_API_KEY});
  await db.collection('footprints').add(footprint).then(ref => {
    console.log('Added document with ID: ', ref.id);
    dispatch({
      type: ADD_FP,
      error: false
    });
    dispatch(fetchFootPrints());
  })
  .catch( err => {
    console.log(err)
    dispatch({
      type: ADD_FP,
      error: true
    });
    dispatch(fetchFootPrints());
  })

}
//async await is required here
export const fetchFootPrints = (user) => async dispatch =>{
  const db = await fs;
  let newState = {
    footprints : []
  };

  let oldState = {
    footprints: 'err'
  }
    await db.collection('footprints').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let id = doc.id;
        let fps = doc.data();
        fps.id = id;
        newState.footprints.push(fps);
      })
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

export const deleteFootPrint = id => async dispatch => {
  const db = await fs;

  await db.collection('footprints').doc(id).delete()
  .then( () => {
    console.log('deleted!');
    dispatch({
      type: DEL_FP,
      error: false
    });
    dispatch(fetchFootPrints());
  })
  .catch( (err) => {
    console.log('delete failed!');
    dispatch({
      type: DEL_FP,
      error: true
    });
    dispatch(fetchFootPrints());
  })
}