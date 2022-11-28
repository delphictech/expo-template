import { initializeApp } from 'firebase/app';
import { initializeAuth, browserPopupRedirectResolver } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import {
    collection,
    CollectionReference,
    DocumentData,
    FirestoreDataConverter,
    getFirestore,
    QueryDocumentSnapshot,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PrivateUserData, PublicUserData } from 'src/types';
import {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID,
} from '@env';

// setup firebase config
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
export const app = initializeApp(firebaseConfig);

/**
 * to get rid of async storage incompatibility with expo, initialize auth with the following method
 * @link https://github.com/firebase/firebase-js-sdk/issues/1847#issuecomment-915634151
 */
export const auth = initializeAuth(app, {
    persistence: [getReactNativePersistence(AsyncStorage)],
    popupRedirectResolver: browserPopupRedirectResolver,
});

/**
 * Initialize firestore and define typed helping collection function
 * @references
 * https://plainenglish.io/blog/using-firestore-with-typescript-in-the-v9-sdk-cf36851bb099
 * https://medium.com/swlh/using-firestore-with-typescript-65bd2a602945
 */
export const db = getFirestore(app);

/**
 * @Test
 */
export const storage = getStorage();

/**
 * Generic data type converter from firestore
 *
 * @template T
 */
const genericConverter = <T>() => ({
    toFirestore: (inputData: T) => inputData,
    fromFirestore: (snapshot: QueryDocumentSnapshot): T => snapshot.data() as T,
});

/**
 * Create a collection function, using typecasting and the withConverter function to get typed data back from firestore
 *
 * @template T
 * @param {string} collectionName
 * @return {*}  {CollectionReference<T>}
 */
const createCollection = <T = DocumentData>(collectionName: string): CollectionReference<T> => {
    const converter = genericConverter<T>() as FirestoreDataConverter<T>;
    return collection(db, collectionName).withConverter<T>(converter);
};

/**
 * Define the collections
 */
export const privateUserCollection = createCollection<PrivateUserData>('private-user-data');
export const publicUserCollection = createCollection<PublicUserData>('public-user-data');
