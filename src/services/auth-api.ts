import {
    anonymousSignIn,
    deleteCurrentUser,
    fetchSignInMethods,
    reauthenticate,
    resetPassword,
    setNewEmail,
    setNewPassword,
    signInWithEmail,
    signOutUser,
    signUpWithEmail,
    verifyEmail,
    // addDefaultPicture,
} from 'src/firebase/auth-api';
import {
    deletePrivateUserData,
    getPrivateUserData,
    updatePrivateUserData,
} from 'src/firebase/user-api';
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

export const AuthApi = ConfigApi.injectEndpoints({
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
                    console.warn(`Error with email: ${e}`);
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
                    try {
                        const userCredential = await anonymousSignIn();

                        // add default user image to storage before adding it to firestore
                        // In the future, will allow users to add image when they sign up

                        // await addDefaultPicture(userCredential.user.uid);

                        // setup guest user
                        const user: PrivateUserData = {
                            id: userCredential.user.uid,
                            isAnonymous: true,
                            emailVerified: userCredential.user.emailVerified,
                            loggedIn: true,
                        };

                        return { data: user };
                    } catch (e: any) {
                        console.warn(`Error with guest sign in ${e}`);
                        return { error: e };
                    }
                } else {
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
                        console.warn(`Error with sign up: ${e}`);
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
                try {
                    // sign in new user and get data from database
                    const userCredential = await signInWithEmail(email, password);
                    const userDoc = await getPrivateUserData(userCredential.user.uid);

                    return { data: { ...userDoc.data(), loggedIn: true } };
                } catch (e: any) {
                    console.warn(`Error with login: ${e}`);
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
                    console.warn(`Error with signout`);
                    return { error: e };
                }
            },
        }),

        deleteAccount: build.mutation<
            PrivateUserData,
            { id: string; email: string; password: string }
        >({
            /**
             * Delete account query
             *
             * @param {string} uid
             * @return {*}
             */
            async queryFn({ id, email, password }) {
                try {
                    await reauthenticate(email, password);
                    await deletePrivateUserData(id);
                    await deleteCurrentUser();
                    // set isDeleted field in the user
                    return {
                        data: { id: '', isAnonymous: false, loggedIn: false, emailVerified: false },
                    };
                } catch (e: any) {
                    console.warn(`Error with deleting user`);
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
                    console.warn(`Error with password reset`);
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
                    console.warn(`Error with verification email`);
                    return { error: e };
                }
            },
        }),

        updatePassword: build.mutation<
            null,
            { email: string; oldPassword: string; newPassword: string }
        >({
            /**
             * Mutation will update the password for the user, reauthenticating in process
             *
             * @param {*} { email, oldPassword, newPassword }
             * @return {*}
             */
            async queryFn({ email, oldPassword, newPassword }) {
                try {
                    await setNewPassword(email, oldPassword, newPassword);
                    return { data: null };
                } catch (e: any) {
                    return { error: e };
                }
            },
        }),

        updateEmail: build.mutation<
            { email: string },
            { userID: string; oldEmail: string; newEmail: string; password: string }
        >({
            /**
             * Will update the user's email
             * Sets the email in auth and firestore, while sending verification email
             *
             * @param {*} { oldEmail, newEmail, password }
             * @return {*}
             */
            async queryFn({ userID, oldEmail, newEmail, password }) {
                try {
                    await setNewEmail(oldEmail, password, newEmail);
                    await verifyEmail();
                    await updatePrivateUserData({ id: userID, email: newEmail });
                    return { data: { email: newEmail } };
                } catch (e: any) {
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
    useDeleteAccountMutation,
    useLazySignInQuery,
    useLazySendPasswordResetQuery,
    useLazySendVerificationEmailQuery,
    useUpdatePasswordMutation,
    useUpdateEmailMutation,
} = AuthApi;
