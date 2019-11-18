import firebase from './index';

export const auth = firebase.auth();
export const storageRef = firebase.storage().ref();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export const signInUser = (email, password) =>
auth.signInAndRetrieveDataWithCredential(email, password);

export const signUpUser = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const chechAuth = callback => auth.onAuthStateChanged(callback);

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