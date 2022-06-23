export interface User {
    /*  
        User object that is set as the redux user object in src/ducks/user-slice
        Must add onto the object as more fields become necessary
    */
    uid: string | undefined;
    email: string | undefined | null;
    phoneNumber: string | undefined | null;
    isAnonymous: boolean | undefined;
    emailVerified: boolean | undefined;
    loggedIn: boolean | undefined;
    count: number;
}
