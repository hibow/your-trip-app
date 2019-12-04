import {firebase, auth, fs, storageRef, storage} from '../firebase/index';
import {FETCH_FPS, ADD_FP, EDIT_FP, SELECT_FP, DEL_FP, UPLOAD_ERR, GET_URL} from './type';
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
      urls: footprint.urls,
      des: footprint.des
    }
  }
  dispatch({
    type: SELECT_FP,
    currentFP: newState.currentFP
  })
}


//delete files
export const deleteFiles = (urls) => {
    if (urls.length) {
      urls.forEach((url) => {
        const desertRef = storage.refFromURL(url);
        desertRef.delete().then(function() {
          // console.log('delete works!')
        }).catch(function(error) {
          // console.log('delete error!', error)
        });
      })
  } else {
    // console.log('no file to delete~!')
  }
}

export const changeFootPrint = (mode, footprint, files) => async dispatch => {
  const db = await fs;
  if (files.length) {
  await files.forEach(async (file) => {
    let metadata = {
      contentType: file.type
    };
    var uploadTask = storageRef.child('images/' + footprint.uid + '/' + new Date().toString() +'_'+ file.name).put(file, metadata);
    await uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          // console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          // console.log('Upload is running');
          break;
      }
    }, function(error) {
    switch (error.code) {
      case 'storage/unauthorized':
        // console.log('User doesn\'t have permission to access the object')
        break;
      case 'storage/canceled':
        // console.log('User canceled the upload')
        break;
      case 'storage/unknown':
        // console.log('Unknown error occurred, inspect error.serverResponse')
        break;
    }
    // console.log('upload err:', error.code)
    dispatch({
      type: UPLOAD_ERR,
      uploadErr: error.code
    })
    }, function() {
    // Upload completed successfully, now we can get the download URL
    uploadTask.snapshot.ref.getDownloadURL().then(async function(downloadURL) {
      // console.log('File available at', downloadURL);
      dispatch({
        type: UPLOAD_ERR,
        uploadErr: false
      })
      dispatch({
        type: GET_URL,
        imgUrl: downloadURL
      })
      //update urls
      if (await downloadURL) {
        await footprint.urls.push(downloadURL);
      }
    //edit footprint
    if (mode === 'edit') {
      let data = {
          username: footprint.username,
          uid: footprint.uid,
          title: footprint.title,
          travelDate: footprint.travelDate,
          country: footprint.country,
          city: footprint.city,
          urls: footprint.urls,
          des: footprint.des,
        }
      let id = footprint.id;
      await db.collection('footprints').doc(id).update(data)
      .then(() => {
        // console.log('update success!')
        dispatch({
          type: EDIT_FP,
          error: false
        })
        dispatch(fetchFootPrints());
      })
      .catch((err) => {
        dispatch({
          type: EDIT_FP,
          error: true
        })
        dispatch(fetchFootPrints());
      })
    } else if (mode ==='add') {
      footprint.position = await forwardGeo({q: `${footprint.title}, ${footprint.city}, ${footprint.country}`, key: env.OPENCAGE_API_KEY});
      console.log('geocode:', footprints.position)
      await db.collection('footprints').add(footprint).then(ref => {
        dispatch({
          type: ADD_FP,
          error: false
        });
        dispatch(fetchFootPrints());
      })
      .catch( err => {
        dispatch({
          type: ADD_FP,
          error: true
        });
        dispatch(fetchFootPrints());
      })
    }
    });
    });
  })
  } else {
      if (mode === 'edit') {
        let data = {
          username: footprint.username,
          uid: footprint.uid,
          title: footprint.title,
          travelDate: footprint.travelDate,
          country: footprint.country,
          city: footprint.city,
          urls: footprint.urls,
          des: footprint.des,
        }
      let id = footprint.id;
      await db.collection('footprints').doc(id).update(data)
      .then(() => {
        dispatch({
          type: EDIT_FP,
          error: false
        })
        dispatch(fetchFootPrints());
      })
      .catch((err) => {
        dispatch({
          type: EDIT_FP,
          error: true
        })
        dispatch(fetchFootPrints());
      })
    } else if (mode ==='add') {
      // console.log(footprint)
      footprint.position = await forwardGeo({q: `${footprint.title}, ${footprint.city}, ${footprint.country}`, key: env.OPENCAGE_API_KEY});
      console.log('geocode:', footprint.position)
      await db.collection('footprints').add(footprint).then(ref => {
        dispatch({
          type: ADD_FP,
          error: false
        });
        dispatch(fetchFootPrints());
      })
      .catch( err => {
        dispatch({
          type: ADD_FP,
          error: true
        });
        dispatch(fetchFootPrints());
      })
    }
  }
 }

//async await is required here
export const fetchFootPrints = () => async dispatch =>{
//get current user's documents
  let uid = auth.currentUser.uid;
  const db = await fs;
  let newState = {
    footprints : []
  };

  let oldState = {
    footprints: []
  }
    await db.collection('footprints').where('uid', '==', uid).get()
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
    // console.log('deleted!');
    dispatch({
      type: DEL_FP,
      error: false
    });
    dispatch(fetchFootPrints());
  })
  .catch( (err) => {
    // console.log('delete failed!');
    dispatch({
      type: DEL_FP,
      error: true
    });
    dispatch(fetchFootPrints());
  })
}