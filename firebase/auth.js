import firebase from './index';
// import firebaseui from 'firebaseui'
// Initialize the FirebaseUI Widget using Firebase.
// const ui = new firebaseui.auth.AuthUI(firebase.auth());
export const auth = firebase.auth();
// export const storageRef = firebase.storage().ref();

// ui.start('#firebaseui-auth-container', {
//   signInOptions: [
//     // List of OAuth providers supported.
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//     firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//     firebase.auth.GithubAuthProvider.PROVIDER_ID
//   ],
//   // Other config options...
// });


export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider).then( (result) => {
  console.log('result:', result);
  console.log('current user: from google:', auth.currentUser)
})
.catch((err) => {
  console.log(err, 'fail to sign in w Google!')
})
export const signOut = () => auth.signOut();

export const signInUser = (email, password) =>
auth.signInWithEmailAndPassword(email, password);

export const signUpUser = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const checkAuth = callback => auth.onAuthStateChanged(callback);

export const reauthenticateUser = password => {
  const user = firebase.auth().currentUser;
  const cred = firebase.auth.EmailAuthProvider.credential(
    user.email,
    password
  );
  return user.reauthenticateWithCredential(cred);
}

export const updatePassword = (curpassword, newpassword) =>
reauthenticateUser(curpassword).then(()=> {
  const user = firebase.auth().currentUser;
  return user.updatePassword(newpassword);
})