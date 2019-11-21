import {SET_USER, SET_AUTH} from './type';
import fb, {fs} from '../firebase/index';
import {
  signInWithGoogle, signInUser, signOut, signUpUser,
  checkAuth, reauthenticateUser, updatePassword,auth
} from '../firebase/auth';
// import { auth } from 'firebase';




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

export const GetUser = async () => {
  let user = auth.currentUser;
  console.log('cur get user:', user)
 await checkAuth(user => {
    if (user === null) {
    // dispatch(SetCurUser(curUser));
    return null;
  } else if (user.uid) {
    console.log('getuser', typeof user.uid)
    return user.uid;
    // dispatch(SetCurUser(null));
    }
  })
}
export const SignInAction = (email, password) => async dispatch => {
  const db = await fs;
  await signInUser(email, password).then( async res => {
    console.log('sign in done!', res);
    let uid = auth.currentUser.uid
    console.log('uid:', uid)
    //get user doc with uid
    await db
    .collection('users')
    .doc(uid).get().then(doc => {
      console.log('get doc:', doc.data())
      dispatch(SetCurAuth(true));
      dispatch(SetCurUser(doc.data()));
    })
  })
  .catch((err) => {
    console.log('fail to sign in!', err);
    dispatch(SetCurAuth(false))
    dispatch(SetCurUser(null));
  })
}

export const SignUpAction = (email, displayName, password) => async dispatch => {
  console.log('pw:', password, typeof password);
  let userDoc = {
    displayName: displayName,
    email: email,
    photoURL: '',
    createdAt: new Date()
  }
  const db = await fs;
  await signUpUser(email, password).then( async result => {
    let user = result.user;
    console.log('signup user:', result.user);
    ///create user doc
    const userRef = await db.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    console.log(snapshot.exists)
    if (!snapshot.exists) {
    let userDoc = {
      displayName: displayName,
      email: email,
      photoURL: '',
      createdAt: new Date()
    }
    try {
      await userRef.set(userDoc)
      console.log('set it or not? when to set?')
      ////set current user doc to set User with uId
      dispatch(SetCurAuth(true));
      dispatch(SetCurUser({...userDoc, uid:user.id}));
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
    await signOut().then( () => {
      dispatch(SetCurUser(null));
      dispatch(SetCurAuth(false));
    });
  };
};
