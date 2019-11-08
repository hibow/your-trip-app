import {SET_USER, SET_AUTH} from './type';
import fb, {fs} from '../firebase/index';
import {
  signInWithGoogle, signInUser, signOut, signUpUser,
  chechAuth, reauthenticateUser, updatePassword
} from '../firebase/auth';

//naming : action, reducer, fb variable...
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

export const GetUser = () => {
  return dispatch => {
    checkAuth(user => {
      if (user) {
        dispatch(SetCurAuth(true)); //sign in
        const userId = user.uid;
        return fs.collection('users').doc(userId).get()
        .then(snapshot => {
          dispatch(SetCurUser({
            ...snapshot.val(), uid: userId, photoURL:user.photoURL
          })); //get user info
        })
      } else {
        dispatch(SetCurAuth(false)) //login fail
      }
    })
  }
};

export const SignInAction = ({email, password}) => {
  return dispatch => {
    return signInUser(email, password).then( async response => {
      return response;
      //dispatch?
    })
    // return true;
  }
}
export const SignUpAction = ({ //create user
  displayName,
  email,
  password
}) => {
  return async dispatch => {
    // signUpUser(email, password).then( user => {
    //   const ref = fs.
    // })
    // return true;
  };
};

export const SignOutAction = () => {
  return async dispatch => {
    await signOut().then( () => {
      dispatch(SetCurUser(null, false));
      dispatch(SetCurAuth(false, false));
    });
  };
};
