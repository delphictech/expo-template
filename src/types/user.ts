export interface User {
    uid: string | null | undefined,
    email: string | null | undefined,
    phoneNumber: string | null | undefined,
    isAnonymous: boolean | null | undefined,
    emailVerified: boolean | null | undefined,
    loggedIn: boolean | null | undefined
}