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
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
} from 'firebase/auth';
import { auth } from './config';
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
 * Changes the email in the 'authentication' section in firebase
 *
 * @export
 * @param {User} user
 * @param {string} newEmail
 * @return {*} {Promise<void>}
 */
export async function resetEmail(newEmail: string): Promise<void> {
    if (auth.currentUser) {
        return firebaseHandler<void>(updateEmail(auth.currentUser, newEmail));
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
 * Function will reauthenticate the user for sensitive actions
 *
 * @export
 * @param {string} email
 * @param {string} password
 * @return {*} {Promise<UserCredential>}
 */
export async function reauthenticate(email: string, password: string): Promise<UserCredential> {
    const credential = EmailAuthProvider.credential(email, password);
    if (auth.currentUser) {
        return firebaseHandler<UserCredential>(
            reauthenticateWithCredential(auth.currentUser, credential),
        );
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
 * Function will set the new password for the user
 *
 * @export
 * @param {string} email
 * @param {string} oldPassword
 * @param {string} newPassword
 * @return {*}  {Promise<void>}
 */
export async function setNewPassword(
    email: string,
    oldPassword: string,
    newPassword: string,
): Promise<void> {
    // https://firebase.google.com/docs/reference/js/auth.md#updatepassword
    if (auth.currentUser) {
        await reauthenticate(email, oldPassword);
        return firebaseHandler(updatePassword(auth.currentUser, newPassword));
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
 * Function will set the user's new email in auth
 *
 * @export
 * @param {string} newEmail
 * @param {string} oldEmail
 * @param {string} password
 * @return {*}  {Promise<void>}
 */
export async function setNewEmail(
    oldEmail: string,
    password: string,
    newEmail: string,
): Promise<void> {
    // https://firebase.google.com/docs/reference/js/auth.md#updateemail
    if (auth.currentUser) {
        await reauthenticate(oldEmail, password);
        return firebaseHandler<void>(updateEmail(auth.currentUser, newEmail));
    }
    const error: FirebaseError = {
        name: 'Firebase Error',
        message: 'User does not exist',
        code: 'auth/user-not-found',
        errorCause: 'account',
    };
    throw error;
}
