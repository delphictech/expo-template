/* eslint-disable no-console */
import { DocumentSnapshot, QueryDocumentSnapshot } from 'firebase/firestore';

/**
 * FirebaseError type used to render errors to the user in the frontend
 *
 * @export
 * @interface FirebaseError
 * @extends {Error}
 */
export interface FirebaseError extends Error {
    message: string;
    code: string | null;
    errorCause: 'email' | 'password' | 'account' | string;
}

/**
 * fbHandler will handle the promise and throw a firebase error if it is not handled correctly
 *
 * @template T
 * @param {Promise<any>} fbQuery
 * @return {*}  {Promise<Awaited<T>>}
 */
export const firebaseHandler = async <T>(fbQuery: Promise<any>): Promise<T> => {
    /*
        Function will handles catching errors with firebase, returning errors in the Firebase Error format
        This will help with catching and display error messages to the user on the frontend.
    */
    try {
        return await fbQuery;
    } catch (error: any) {
        // Define different firebase user errors
        let message = null;
        let cause = 'email';
        switch (error.code) {
            case 'auth/invalid-email':
                message = 'Email is invalid.';
                cause = 'email';
                break;
            case 'auth/user-disabled':
                message = "User's account is disabled.";
                cause = 'account';
                break;
            case 'auth/user-not-found':
                message = 'User does not exist.';
                cause = 'account';
                break;
            case 'auth/wrong-password':
                message = 'Email or password is incorrect.';
                cause = 'password';
                break;
            case 'auth/user-mismatch':
                message = 'User credentials do not match.';
                cause = 'account';
                break;
            case 'auth/too-many-requests':
                message = 'Account has exceeded its request limit.';
                cause = 'account';
                break;
            default:
                message = 'Backend Error';
                cause = 'account';
                console.warn(`New Backend error`);
                console.warn(error);
        }

        // assign values to interface
        const fbError: FirebaseError = {
            name: 'Firebase Error',
            message,
            code: error.code,
            errorCause: cause,
        };
        throw fbError;
    }
};

/**
 * Function used to handle functions that fetch data using a getDoc method, will return an error if no documents match
 *
 * @template T
 * @param {Promise<DocumentSnapshot<T>>} firestoreQuery
 * @return {Promise<QueryDocumentSnapshot<T>>}
 */
export const firestoreGetHandler = async <T>(
    firestoreQuery: Promise<DocumentSnapshot<T>>,
): Promise<QueryDocumentSnapshot<T>> => {
    const result = await firebaseHandler<DocumentSnapshot<T>>(firestoreQuery);
    if (result.exists()) {
        return result;
    }

    // throw document does not exist
    const fbError: FirebaseError = {
        name: 'Firebase Error',
        message: 'Document does not exist',
        code: 'firestore/does-not-exist',
        errorCause: 'firestore-document',
    };
    throw fbError;
};
