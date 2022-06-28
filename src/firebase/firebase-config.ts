// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeAuth, browserPopupRedirectResolver } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Setup Keys
import {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID,
} from '@env';

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
/* 
  to get rid of async storage incompatibility with expo, initialize auth with the following method
  https://github.com/firebase/firebase-js-sdk/issues/1847#issuecomment-915634151
*/
const auth = initializeAuth(app, {
    persistence: [getReactNativePersistence(AsyncStorage)],
    popupRedirectResolver: browserPopupRedirectResolver,
});
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, auth, db };
