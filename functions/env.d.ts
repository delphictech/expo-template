declare module '@env' {
    /* 
        Environmental variables configuration, used in the firebase-config file
        Uses the react-native-dotenv package
        https://www.npmjs.com/package/react-native-dotenv 
    */
    export const FIREBASE_API_KEY: string;
    export const FIREBASE_AUTH_DOMAIN: string;
    export const FIREBASE_PROJECT_ID: string;
    export const FIREBASE_STORAGE_BUCKET: string;
    export const FIREBASE_MESSAGING_SENDER_ID: string;
    export const FIREBASE_APP_ID: string;
    export const FIREBASE_MEASUREMENT_ID: string;
}
