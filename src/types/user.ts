export interface User {
    uid: string | undefined;
    email: string | undefined | null;
    phoneNumber: string | undefined | null;
    isAnonymous: boolean | undefined;
    emailVerified: boolean | undefined;
    loggedIn: boolean | undefined;
}
