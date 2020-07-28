import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA8UpZmdCwnL2WsbTvr1sDSK4hyrzKE5wE",
  authDomain: "crwn-db-9be7a.firebaseapp.com",
  databaseURL: "https://crwn-db-9be7a.firebaseio.com",
  projectId: "crwn-db-9be7a",
  storageBucket: "crwn-db-9be7a.appspot.com",
  messagingSenderId: "289986009424",
  appId: "1:289986009424:web:4e6d56309b0decae00f455",
  measurementId: "G-JH4KR38W8G",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
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
      console.log("Error creating user", error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
