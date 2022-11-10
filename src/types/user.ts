export interface PublicUserData {
    /*
        Public facing user data. Will be updated in database from the PrivateUserData.
        Should be read-only from the database.
    */
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    image?: string | null;
    count?: number | null;
};

export interface PrivateUserData extends PublicUserData {
    /*  
        User object that can be written by the user. Will update the public data.
    */
    email?: string | null;
    phoneNumber?: string | null;
    isAnonymous: boolean;
    emailVerified: boolean;
    loggedIn: boolean;
};
