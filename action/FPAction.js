import {fs} from '../firebase/index'; //firestore
import {FETCH_FPS, ADD_FPS, EDIT_FPS} from './type';
import forwardGeo from '../lib/forwardGeo';
import env from '../config';
// const footprint = {
//   date: new Date(),
//   place:'',
//   city: '',
//   country:'',
//   des:'',
//   url:''
// }

export const editFootPrint = (footprint) => async dispatch => {
  let newState = {
    newFootPrint : {
      username: footprint.username,
      place: footprint.place,
      travelDate: footprint.date,
      country: footprint.country,
      city: footprint.city,
      url: footprint.url,
      des: footprint.des
    }
  }
  dispatch({
    type: EDIT_FPS,
    newFootPrint: newState.newFootPrint
  })
}

export const addFootPrints = (footprint) => async dispatch => {
  const db = await fs;
  //get [lat, lut]
  footprint.geocode = await forwardGeo({q: `${footprint.title}, ${footprint.city}, ${footprint.country}`, key: env.OPENCAGE_API_KEY});
  await console.log('current fps:', footprint)
  await db.collection('footprints').add(footprint).then(ref => {
    console.log('Added document with ID: ', ref.id);
    dispatch({
      type: ADD_FPS,
      error: false
    });
  })
  .catch( err => {
    dispatch({
      type: ADD_FPS,
      error: true
    });
  })

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
  // dispatch({
  //   type: FETCH_FPS,
  //   footprints: []
  // })
  await db.collection('users').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        let fps = doc.data().footprints;
        console.log(fps, 'done')
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

//delete
export const deleteFootPrint = footprint => async dispatch => {
  const db = await fs;

  await db.collection('footprints').doc('DC').delete();
  console
  //fetch again

}
//update = add