import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInAnonymously,
    signOut,
    fetchSignInMethodsForEmail,
    deleteUser,
    sendPasswordResetEmail,
    sendEmailVerification,
    UserCredential,
} from 'firebase/auth';
import { auth } from './config';
import { fbHandler, FirebaseError } from './handler';

export { FirebaseError };

/*
  AUTH FUNCTIONS: https://firebase.google.com/docs/reference/js/auth.md#auth_package
*/
// Sign In Anonymously
export async function anonymousSignIn() {
    // https://firebase.google.com/docs/reference/js/auth.md#signinanonymously
    return fbHandler<UserCredential>(signInAnonymously(auth));
}

// Check Sign In Methods
export async function fetchSignInMethods(email: string) {
    // https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#fetchsigninmethodsforemail
    return fbHandler<string[]>(fetchSignInMethodsForEmail(auth, email));
}

// Sign In With Email
export async function signInWithEmail(email: string, password: string) {
    // https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signinwithemailandpassword
    return fbHandler<UserCredential>(signInWithEmailAndPassword(auth, email, password));
}

// Sign Up With Email
export async function signUpWithEmail(email: string, password: string) {
    return fbHandler<UserCredential>(createUserWithEmailAndPassword(auth, email, password));
}

// Email Verifcation:
export async function verifyEmail() {
    // https://firebase.google.com/docs/reference/js/auth.md#sendemailverification
    if (auth.currentUser) {
        return fbHandler<void>(sendEmailVerification(auth.currentUser));
    }
    const error: FirebaseError = {
        name: 'Firebase Error',
        message: 'User does not exist',
        code: 'auth/user-not-found',
        errorCause: 'account',
    };
    return error;
}

// Delete user
export async function deleteCurrentUser() {
    if (auth.currentUser) {
        console.log('deleting user');
        // https://firebase.google.com/docs/auth/web/manage-users#delete_a_user
        return fbHandler<void>(deleteUser(auth.currentUser));
    }
    const error: FirebaseError = {
        name: 'Firebase Error',
        message: 'User does not exist',
        code: 'auth/user-not-found',
        errorCause: 'account',
    };
    return error;
}

// Sign Out
export async function signOutUser() {
    // Delete user if anonymous
    if (auth.currentUser?.isAnonymous) {
        return fbHandler<void>(deleteCurrentUser());
    }
    return fbHandler<void>(signOut(auth));
}

// Handle password reset
export async function resetPassword(email: string) {
    // https://firebase.google.com/docs/reference/js/auth.md#sendpasswordresetemail
    return fbHandler<void>(sendPasswordResetEmail(auth, email));
}
