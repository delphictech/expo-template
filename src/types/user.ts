export interface User {
    uid: string | null,
    email: string | null,
    phoneNumber: string | null,
    isAnonymous: boolean,
    emailVerified: boolean
}