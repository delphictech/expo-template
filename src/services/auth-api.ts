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
import { PrivateUserData } from 'src/types/user';
import { ConfigApi } from './config-api';

/*
    Check documentation resources for additional questions
    Customizing RTK Query with 
        firebase api calls with RTK-Query: https://stackoverflow.com/questions/71587312/is-it-possible-to-use-firebase-query-with-redux-toolkit-or-rtk-query-in-react)
        queryfn: https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#implementing-a-queryfn 
        fakeBaseQuery: https://redux-toolkit.js.org/rtk-query/usage-with-typescript#typing-a-queryfn
    Code Splitting: https://redux-toolkit.js.org/rtk-query/usage/code-splitting 
*/

export const AuthUserApi = ConfigApi.injectEndpoints({
    endpoints: (build) => ({

        /**
         * Will fetch the sign in methods of the user, returning a list
         * @param email
         */
        fetchSignInMethods: build.query<string[], string>({
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

        /*
            Will sign up the user. No parameters mean a guest account will be generated
        */
        signUp: build.query<
            PrivateUserData,
            { email: string; password: string; firstName: string; lastName: string } | 'guest'
        >({
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
                        // TODO: send guest account to new account user data
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

        /*
            Used to login the user with the credentials
        */
        signIn: build.query<PrivateUserData, { email: string; password: string }>({
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

        /*
            Sign out user
        */
        signOut: build.query<null, undefined>({
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

        /*
            Delete account query
        */
        deleteAccount: build.query<PrivateUserData, string>({
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

        /*
            Re-authenticate user for security sensitive actions
        */
        reauthenticate: build.query<null, { email: string; password: string }>({
            async queryFn({ email, password }) {
                try {
                    await reauthenticate(email, password);
                    return { data: null };
                } catch (e: any) {
                    console.log(`Error with reauthenticating user`);
                    return { error: e };
                }
            },
        }),
        /*
            Generating query for forgetting user password
        */
        sendPasswordReset: build.query<string, string>({
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
        /*
            Generating query for sending verification email
        */
        sendVerificationEmail: build.query<null, undefined>({
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


        updatePassword: build.query<null, string>({
            async queryFn(password: string) {
                try {
                    await setNewPassword(password);
                    return { data: null };
                } catch (e: any) {
                    return { error: e };
                }
            },
        }),
        updateEmail: build.query<string, { user: User; newEmail: string }>({
            async queryFn({ user, newEmail }) {
                try {
                    console.log('updating email right now');
                    await setNewEmail(newEmail);
                    await updateUser(user);
                    await verifyEmail();
                    // return email to set for user state object
                    return { data: newEmail };
                } catch (e: any) {
                    console.log('error with updating email');
                    console.log(e);
                    return { error: e };
                }
            },
        }),
        updateUser: build.mutation<User, User>({
            async queryFn(userFields) {
                // const newUser = initializeUser(user);
                try {
                    // get existing user doc
                    await updateUser(userFields);
                    return { data: userFields };
                } catch (e: any) {
                    console.log(`Error with updating user: ${e}`);
                    console.log(e);
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
    useLazyReauthenticateQuery,
    useLazySendPasswordResetQuery,
    useLazySendVerificationEmailQuery,
    useLazyRefreshUserDataQuery,
    useLazyUpdateEmailQuery,
    useLazyUpdatePasswordQuery,
    useUpdateUserMutation,
} = AuthUserApi;
