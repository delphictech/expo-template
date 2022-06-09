export interface FirebaseError {
    message: string | null;
    type: string | null;
    cause: 'email' | 'password' | 'account' | string;
}

export function fbHandler<T, U = Error>(
    /*
        Function will handles catching errors with firebase 
    */
    promise: Promise<T>,
    errorExt?: any,
  ): Promise<[U, undefined] | [null, T]> {
    return promise
      .then<[null, T]>((data: T) => [null, data])
      .catch<[U, undefined]>((err: U) => {
        if (errorExt) {
            let message = null, cause = 'email';
            switch (errorExt) {
                case 'auth/invalid-email':
                    message = "Email is invalid.";
                    cause = 'email';
                case 'auth/user-disabled':
                    message = "User's account is disabled.";
                    cause = 'account';
                case 'auth/user-not-found':
                    message = "User does not exist.";
                    cause = 'account';
                case 'auth/wrong-password':
                    message = "Email or password is incorrect.";
                    cause = 'password';
            }
            const fbError: FirebaseError = {
                message: message,
                type: errorExt,
                cause: cause,
            }
            throw fbError;
        }
      });
  }