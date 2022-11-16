import { initializeApp } from 'firebase-admin/app';
import { firestore } from 'firebase-admin';

// initialize firebase app
initializeApp();

// initialize firestore
export const db = firestore();
