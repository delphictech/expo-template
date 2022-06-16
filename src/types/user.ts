export interface User {
    uid: string | undefined,
    email: string | undefined,
    phoneNumber: string | undefined,
    isAnonymous: boolean | undefined,
    emailVerified: boolean | undefined,
    loggedIn: boolean | undefined
}