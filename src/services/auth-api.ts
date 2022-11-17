import {
    anonymousSignIn,
    deleteCurrentUser,
    fetchSignInMethods,
    resetPassword,
    signInWithEmail,
    signOutUser,
    signUpWithEmail,
    verifyEmail,
} from 'src/firebase/auth-api';
import { deletePrivateUserData, getPrivateUserData, updatePrivateUserData } from 'src/firebase/user-api';
import { PrivateUserData } from 'src/types';
import { ConfigApi } from './config-api';

/** 
 * Check documentation resources for additional questions
 * 
 * @resources
 * Customizing RTK Query with following resources
 * Firebase api calls with RTK-Query: https://stackoverflow.com/questions/71587312/is-it-possible-to-use-firebase-query-with-redux-toolkit-or-rtk-query-in-react)
 * Using queryfn: https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#implementing-a-queryfn 
 * Using fakeBaseQuery: https://redux-toolkit.js.org/rtk-query/usage-with-typescript#typing-a-queryfn
 * Code Splitting: https://redux-toolkit.js.org/rtk-query/usage/code-splitting 
 * 
*/

export const AuthUserApi = ConfigApi.injectEndpoints({

    endpoints: (build) => ({

        fetchSignInMethods: build.query<string[], string>({
            /**
             * Will fetch the sign in methods of the user, returning a list
             *
             * @param {*} email
             * @return {*} 
             */
            async queryFn(email) {
                try {
                    const methods = await fetchSignInMethods(email);
                    return { data: methods };
                } catch (e: any) {
                    console.log(`Error with email: ${e}`);
                    return { error: e };
                }
            },
        }),

        signUp: build.query<
            PrivateUserData,
            { email: string; password: string; firstName: string; lastName: string } | 'guest'
        >({
            /**
             * Will sign up the user. No parameters mean a guest account will be generated
             *
             * @param {*} accountInfo
             * @return {*} 
             */
            async queryFn(accountInfo) {
                if (accountInfo === 'guest') {
                    console.log('Sign up guest user');
                    try {
                        const userCredential = await anonymousSignIn();
                        // setup guest user
                        const user: PrivateUserData = {
                            id: userCredential.user.uid,
                            isAnonymous: true,
                            emailVerified: userCredential.user.emailVerified,
                            loggedIn: true,
                        };
                        return { data: user };
                    } catch (e: any) {
                        console.log(`Error with guest sign in ${e}`);
                        return { error: e };
                    }
                } else {
                    console.log('Sign up user');
                    try {
                        const userCredential = await signUpWithEmail(
                            accountInfo.email,
                            accountInfo.password,
                        );
                        const user: PrivateUserData = {
                            id: userCredential.user.uid,
                            isAnonymous: false,
                            emailVerified: userCredential.user.emailVerified,
                            loggedIn: true,
                            firstName: accountInfo.firstName,
                            lastName: accountInfo.lastName,
                            email: userCredential.user.email,
                        };
                        await verifyEmail();
                        // store user data in firestore
                        await updatePrivateUserData(user, true);
                        return { data: user };
                    } catch (e: any) {
                        console.log(`Error with sign up: ${e}`);
                        return { error: e };
                    }
                }
            },
        }),

        signIn: build.query<PrivateUserData, { email: string; password: string }>({
            /**
             * Used to login the user with the credentials
             *
             * @param {*} { email, password }
             * @return {*} 
             */
            async queryFn({ email, password }) {
                console.log('signing in user');
                try {
                    // sign in new user and get data from database
                    const userCredential = await signInWithEmail(email, password);
                    const userDoc = await getPrivateUserData(userCredential.user.uid);

                    return { data: { ...userDoc.data(), loggedIn: true } };
                } catch (e: any) {
                    console.log(`Error with login: ${e}`);
                    return { error: e };
                }
            },
        }),

        signOut: build.query<null, undefined>({
            /**
             * Sign out user
             *
             * @return {*} 
             */
            async queryFn() {
                try {
                    await signOutUser();
                    return { data: null };
                } catch (e: any) {
                    console.log(`Error with signout`);
                    return { error: e };
                }
            },
        }),

        deleteAccount: build.query<PrivateUserData, string>({
            /**
             * Delete account query
             *
             * @param {string} uid
             * @return {*} 
             */
            async queryFn(uid: string) {
                try {
                    await deletePrivateUserData(uid);
                    await deleteCurrentUser();
                    // set isDeleted field in the user
                    return { data: { id: '', isAnonymous: false, loggedIn: false, emailVerified: false } };
                } catch (e: any) {
                    console.log(`Error with deleting user`);
                    return { error: e };
                }
            },
        }),

        sendPasswordReset: build.query<string, string>({
            /**
             * Generating query for forgetting user password
             *
             * @param {*} email
             * @return {*} 
             */
            async queryFn(email) {
                try {
                    await resetPassword(email);
                    return { data: email };
                } catch (e: any) {
                    console.log(`Error with password reset`);
                    return { error: e };
                }
            },
        }),

        sendVerificationEmail: build.query<null, undefined>({
            /**
             * Generating query for sending verification email
             *
             * @return {*} 
             */
            async queryFn() {
                try {
                    await verifyEmail();
                    return { data: null };
                } catch (e: any) {
                    console.log(`Error with verification email`);
                    return { error: e };
                }
            },
        }),
    }),

    overrideExisting: true,
});

export const {
    useLazyFetchSignInMethodsQuery,
    useLazySignUpQuery,
    useLazySignOutQuery,
    useLazyDeleteAccountQuery,
    useLazySignInQuery,
    useLazySendPasswordResetQuery,
    useLazySendVerificationEmailQuery,
} = AuthUserApi;
