/* import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'; */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
  apiKey: 'AIzaSyBn7SkwabfKGmE36uaLB6RBZpEfl1q28mk',
  authDomain: 'crwn-db-4e151.firebaseapp.com',
  projectId: 'crwn-db-4e151',
  storageBucket: 'crwn-db-4e151.appspot.com',
  messagingSenderId: '451294210119',
  appId: '1:451294210119:web:1bba38e74f3275c5aae962',
  measurementId: 'G-V8MME99S17',
};

firebase.initializeApp(config);

/* export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}; */

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
