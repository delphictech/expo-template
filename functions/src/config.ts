import { initializeApp } from 'firebase-admin/app';
import { firestore } from 'firebase-admin';

// initialize firebase app
initializeApp();

/**
 * Declare database instance
 */
export const db = firestore();
