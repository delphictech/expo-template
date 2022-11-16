import { initializeApp } from 'firebase-admin/app';
import { firestore } from 'firebase-admin';

// initialize firebase app
initializeApp({ projectId: process.env.PROJECT_NAME });

/**
 * Declare database instance
 */
export const db = firestore();
