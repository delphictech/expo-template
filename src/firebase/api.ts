import { to } from "utils/to";
import { firebase, auth, analytics } from "./firebase";

// Sign In Anonymously
export async function signInAnonymously() {
  return await to(firebase.auth().signInAnonymously());
}

// Sign In With Email
export async function signInWithEmail(email: string, password: string) {
  return await to(firebase.auth().signInWithEmailAndPassword(email, password));
}

// Sign Up With Email
export async function signUpWithEmail(email: string, password: string) {
  return await to(firebase.auth().createUserWithEmailAndPassword(email, password));
}

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
