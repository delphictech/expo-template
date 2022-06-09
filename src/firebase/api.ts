import { to } from "utils";
import { app, auth, analytics } from "./firebase-config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously } from 'firebase/auth';

// Sign In Anonymously
export async function anonymousSignIn() {
  return await to(signInAnonymously(auth));
}

// Sign In With Email
export async function signInWithEmail(email: string, password: string) {
  return await to(signInWithEmailAndPassword(auth, email, password));
}

// Sign Up With Email
export async function signUpWithEmail(email: string, password: string) {
  return await to(createUserWithEmailAndPassword(auth, email, password));
}

/*
// Reset Password
export async function resetPassword(email: string) {
  return await to(firebase.auth().sendPasswordResetEmail(email));
}

// Confirm Email
export async function confirmEmail() {
  return await to(firebase.auth().currentUser.sendEmailVerification());
}

// Get Current User
export async function getCurrentUser() {
  return await to(firebase.auth().currentUser);
}

// Sign Out
export function signOut() {
  firebase.auth().signOut();
}
*/
