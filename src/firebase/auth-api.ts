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
    updateEmail,
    User,
} from 'firebase/auth';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { auth, storage } from './config';
import { firebaseHandler, FirebaseError } from './handler';

export { FirebaseError };

/**
 * AUTH FUNCTIONS: https://firebase.google.com/docs/reference/js/auth.md#auth_package
 */

/**
 * sign in as a guest user
 * https://firebase.google.com/docs/reference/js/auth.md#signinanonymously
 * @export
 * @return {*}  {Promise<UserCredential>}
 */
export async function anonymousSignIn(): Promise<UserCredential> {
    return firebaseHandler<UserCredential>(signInAnonymously(auth));
}

/**
 * Get the sign in methods
 * https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#fetchsigninmethodsforemail
 * @export
 * @param {string} email
 * @return {*}  {Promise<string[]>} a list of the sign in methods
 */
export async function fetchSignInMethods(email: string): Promise<string[]> {
    return firebaseHandler<string[]>(fetchSignInMethodsForEmail(auth, email));
}

/**
 * Sign in with an email and password
 * https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signinwithemailandpassword
 * @export
 * @param {string} email
 * @param {string} password
 * @return {*}  {Promise<UserCredential>}
 */
export async function signInWithEmail(email: string, password: string): Promise<UserCredential> {
    return firebaseHandler<UserCredential>(signInWithEmailAndPassword(auth, email, password));
}

/**
 * Sign up with an email and password
 * https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#createuserwithemailandpassword
 * @export
 * @param {string} email
 * @param {string} password
 * @return {*}  {Promise<UserCredential>}
 */
export async function signUpWithEmail(email: string, password: string): Promise<UserCredential> {
    return firebaseHandler<UserCredential>(createUserWithEmailAndPassword(auth, email, password));
}

/**
 * Send verification email to the account email
 * https://firebase.google.com/docs/reference/js/auth.md#sendemailverification
 * @export
 * @return {*}  {Promise<void>}
 */
export async function verifyEmail(): Promise<void> {
    if (auth.currentUser) {
        return firebaseHandler<void>(sendEmailVerification(auth.currentUser));
    }
    const error: FirebaseError = {
        name: 'Firebase Error',
        message: 'User does not exist',
        code: 'auth/user-not-found',
        errorCause: 'account',
    };
    throw error;
}

/**
 * Delete the current user
 * https://firebase.google.com/docs/auth/web/manage-users#delete_a_user
 * @export
 * @return {*}  {Promise<void>}
 */
export async function deleteCurrentUser(): Promise<void> {
    if (auth.currentUser) {
        return firebaseHandler<void>(deleteUser(auth.currentUser));
    }
    const error: FirebaseError = {
        name: 'Firebase Error',
        message: 'User does not exist',
        code: 'auth/user-not-found',
        errorCause: 'account',
    };
    throw error;
}

/**
 * Sign out the current user
 * https://firebase.google.com/s/#signout
 * @export
 * @return {*}  {Promise<void>}
 */
export async function signOutUser(): Promise<void> {
    // Delete user if anonymous
    if (auth.currentUser?.isAnonymous) {
        return firebaseHandler<void>(deleteCurrentUser());
    }
    return firebaseHandler<void>(signOut(auth));
}

/**
 * Handle the password reset
 * https://firebase.google.com/docs/reference/js/auth.md#sendpasswordresetemail
 * @export
 * @param {string} email
 * @return {*}  {Promise<void>}
 */
export async function resetPassword(email: string): Promise<void> {
    return firebaseHandler<void>(sendPasswordResetEmail(auth, email));
}

/**
 *Changes the email in the 'authentication' section in firebase
 *
 * @export
 * @param {User} user
 * @param {string} newEmail
 * @return {*}
 */
export async function resetEmail(newEmail: string) {
    if (auth.currentUser) {
        return firebaseHandler<void>(updateEmail(auth.currentUser, newEmail));
    }
    const error: FirebaseError = {
        name: 'Firebase Error',
        message: 'User does not exist',
        code: 'auth/user-not-found',
        errorCause: 'account',
    };
    return error;
}

/**
 * Adds default image to firebase storage
 *
 * @export
 * @param {string} userID
 * @param {string} [firstName]
 * @param {string} [lastName]
 */
export async function addDefaultPicture(userID: string, firstName?: string, lastName?: string) {
    const file =
        firstName && lastName
            ? `https://ui-avatars.com/api/?name=${firstName}+${lastName}&size=214`
            : `https://ui-avatars.com/api/?name=Guest&size=214`;
    const img = await fetch(file);
    const blobFile = await img.blob();
    const storageRef = ref(storage, `user-profile-img/${userID}/`);
    await uploadBytesResumable(storageRef, blobFile);
}
