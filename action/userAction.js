import {fb} from '../firebase/index'

export const createUser = async (user, additionalData) =>{
  if (!user) return;
  const db = await fb;
  const userRef = db.doc(`users/$user.uid`);

  const snapshot = await userRef.get();
  console.log(snapshot.exists);
  if (!snapshot.exists) {
    const {displayName, email, photoURL} = user;
    const createAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createAt,
        ...additionalData,
      });
    } catch (err) {
      console.error(`Error creating user`, err);
    }
  }
  return getUserDoc(user.uid);
};

export const getUserDoc = async uid => {
  if (!uid) return null;
  try {
    return await fb.collection('user').doc(uid)
  }catch(err) {
    console.error(`Error fetching user!`, err);
  }
}
