export interface FirebaseError extends Error {
    message: string;
    code: string | null;
    errorCause: 'email' | 'password' | 'account' | string;
}

export const fbHandler = async (fbQuery: Promise<any>) => {
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
            case 'auth/too-many-requests':
                message = 'Account has exceeded its request limit.';
                cause = 'account';
                break;
            default:
                message = 'Backend Error';
                cause = 'account';
                console.log(`New Backend error`);
                console.log(error.code);
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
