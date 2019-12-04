import {SET_USER, SET_AUTH} from './type';
import {fs, auth} from '../firebase/index';
import Router from "next/router";
import {
  provider, signInUser, signOut, signUpUser,
  checkAuth, reauthenticateUser, updatePassword
} from '../firebase/auth';



export const SetCurUser = (curuser) => {
  return {
    type: SET_USER,
    user: curuser
  }
}

export const SetCurAuth = (isAuth) => {
  return isAuth ? { type: SET_AUTH, loaded: true}
  : {type: SET_AUTH, loaded: false};
}

//verify authenticated user if exists then push to home page
export const GetUser = async (user, route) => {
  if (!user) {
    user = auth.currentUser;
  }
  await checkAuth(user => {
    if (user === null) {
    return null;
  } else if (user.uid) {
    return route? Router.push(route): user.uid
    }
  })
}

export const signInWithGoogle = () => async dispatch => auth.signInWithPopup(provider).then( async (result) => {

  let user = auth.currentUser;
  const db = await fs;
    ///create user doc
  const userRef = await db.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const {displayName, email, photoURL} = user;
  let userDoc = {
    displayName: displayName,
    email: email,
    photoURL: photoURL,
    createdAt: new Date(),
  }
  try {
    await userRef.set(userDoc)
    userDoc.uid = user.uid;
    ////set current user doc to set User with uId
    dispatch(SetCurAuth(true));
    dispatch(SetCurUser(userDoc));
  } catch (error) {
    console.error('Error creating user', console.error);
    dispatch(SetCurAuth(true));
    dispatch(SetCurUser(null));
  }} else {
    dispatch(SetCurAuth(true));
    let newUserDoc = snapshot.data();
    newUserDoc.uid = user.uid;
    dispatch(SetCurUser(newUserDoc));
  }}
  )
.catch((err) => {
  console.log(err, 'fail to sign in w Google!')
  dispatch(SetCurAuth(false));
  dispatch(SetCurUser(null));
});

export const SignInAction = (email, password) => async dispatch => {
  const db = await fs;
  await signInUser(email, password).then( async res => {
    let uid = auth.currentUser.uid
    //get user doc with uid
    await db
    .collection('users')
    .doc(uid).get().then(doc => {
      dispatch(SetCurAuth(true));
      let userDoc = doc.data();
      userDoc.uid = uid;
      dispatch(SetCurUser(userDoc));
    })
  })
  .catch((err) => {
    console.log('fail to sign in!', err);
    dispatch(SetCurAuth(false))
    dispatch(SetCurUser(null));
  })
}

export const SignUpAction = (email, displayName, password) => async dispatch => {
  const db = await fs;
  await signUpUser(email, password).then( async result => {
    let user = result.user;
    ///create user doc
    const userRef = await db.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
    let userDoc = {
      displayName: displayName,
      email: email,
      photoURL: '',
      createdAt: new Date()
    }
    try {
      await userRef.set(userDoc)
      userDoc.uid = user.uid;
      ////set current user doc to set User with uId
      dispatch(SetCurAuth(true));
      dispatch(SetCurUser(userDoc));
    } catch (error) {
      console.error('Error creating user', console.error);
      dispatch(SetCurAuth(true));
      dispatch(SetCurUser(null));
    }
   }

  }
)}


export const SignOutAction = () => {
  return async dispatch => {
    await signOut().then( (res) => {
      dispatch(SetCurUser(null));
      dispatch(SetCurAuth(false));
    });
  };
};
