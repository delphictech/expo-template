/**
 * Public facing user data. Will be updated in database from the PrivateUserData.
 *
 * @remarks
 * Should be read-only from the database.
 *
 * @export
 * @interface PublicUserData
 */
export interface PublicUserData {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    image?: string | null;
    count?: number | null;
}

/**
 * User object that can be written by the user. Will update the public data.
 *
 * @export
 * @interface PrivateUserData
 * @extends {PublicUserData}
 */
export interface PrivateUserData extends PublicUserData {
    email?: string | null;
    phoneNumber?: string | null;
    isAnonymous: boolean;
    emailVerified: boolean;
    loggedIn: boolean;
}