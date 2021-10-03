// import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBn7SkwabfKGmE36uaLB6RBZpEfl1q28mk',
  authDomain: 'crwn-db-4e151.firebaseapp.com',
  projectId: 'crwn-db-4e151',
  storageBucket: 'crwn-db-4e151.appspot.com',
  messagingSenderId: '451294210119',
  appId: '1:451294210119:web:1bba38e74f3275c5aae962',
  measurementId: 'G-V8MME99S17',
};

initializeApp(firebaseConfig);
// const db = getFirestore(app);

// Get a list of cities from your database

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = getDoc(`users/${userAuth.uid}`);
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
    } catch (err) {
      console.log('error creating user', err.message);
    }
  }
  return userRef;
}

export const auth = getAuth();
export const firestore = getFirestore();

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => signInWithPopup(provider);

// export default firebase;

/*
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';

import firebase from '@firebase/app-compat';
import '@firebase/app-compat/firestore'

const firestore = firebase.firestore();

firestore.collection('users').doc('426ogAaAurqzrByOq6Dx').collection('cartItems').doc('RyPTLssoPbQBUWBI8Pj1');
firestore.doc('/users/426ogAaAurqzrByOq6Dx/cartItems/RyPTLssoPbQBUWBI8Pj1');
firestore.collection('/users/426ogAaAurqzrByOq6Dx/cartItems');
*/
// rules
/* rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if
          request.time < timestamp.date(2021, 10, 31);
    }
  }
} */