import {
    anonymousSignIn,
    deleteCurrentUser,
    fetchSignInMethods,
    reauthenticate,
    reloadUser,
    resetPassword,
    setNewEmail,
    setNewPassword,
    signInWithEmail,
    signOutUser,
    signUpWithEmail,
    verifyEmail,
} from 'src/firebase/auth-api';
import { initializeUser, User } from 'src/types/user';
import { getUser, updateUser } from 'src/firebase';
import { EmptyFirebaseApi } from './empty-api';

/*
    Check documentation resources for additional questions
    Customizing RTK Query with 
        firebase api calls with RTK-Query: https://stackoverflow.com/questions/71587312/is-it-possible-to-use-firebase-query-with-redux-toolkit-or-rtk-query-in-react)
        queryfn: https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#implementing-a-queryfn 
        fakeBaseQuery: https://redux-toolkit.js.org/rtk-query/usage-with-typescript#typing-a-queryfn
    Code Splitting: https://redux-toolkit.js.org/rtk-query/usage/code-splitting 
*/

export const AuthUserApi = EmptyFirebaseApi.injectEndpoints({
    endpoints: (build) => ({
        /* 
            Will fetch the sign in methods of the user, returning a list
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
            User,
            { email: string; password: string; firstName: string; lastName: string } | 'guest'
        >({
            async queryFn(accountInfo) {
                if (accountInfo === 'guest') {
                    console.log('Sign up guest user');
                    try {
                        const response = await anonymousSignIn();
                        const user = initializeUser({
                            uid: response.user.uid,
                            isAnonymous: true,
                            loggedIn: true,
                            firstName: null,
                            lastName: null,
                        });
                        return { data: user };
                    } catch (e: any) {
                        console.log(`Error with guest sign in ${e}`);
                        return { error: e };
                    }
                } else {
                    console.log('Sign up user');
                    try {
                        // TODO: send guest account to new account user data
                        const { user } = await signUpWithEmail(
                            accountInfo.email,
                            accountInfo.password,
                        );
                        const newUser = initializeUser({
                            uid: `maet-user-${user.uid}`,
                            email: user.email,
                            firstName: accountInfo.firstName,
                            lastName: accountInfo.lastName,
                            phoneNumber: user.phoneNumber,
                            isAnonymous: false,
                            emailVerified: user.emailVerified,
                            loggedIn: true,
                        });
                        // store user data in firestore
                        await updateUser(newUser, true);
                        return { data: newUser };
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
        signIn: build.query<User, { email: string; password: string }>({
            async queryFn({ email, password }) {
                console.log('signing in user');
                try {
                    // sign in new user and get data from database
                    const { user } = await signInWithEmail(email, password);
                    const newUser = await getUser(user.uid);
                    console.log('signed in');
                    console.log(newUser);
                    return { data: { ...newUser, loggedIn: true } };
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
        deleteAccount: build.query<User, string>({
            async queryFn(uid: string) {
                try {
                    const updatedFields: User = {
                        uid,
                        isDeleted: true,
                        isAnonymous: false,
                        loggedIn: false,
                        firstName: null,
                        lastName: null,
                    };
                    await updateUser(updatedFields);
                    await deleteCurrentUser();
                    // set isDeleted field in the user
                    return { data: updatedFields };
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
        refreshUserData: build.query<User, undefined>({
            async queryFn() {
                try {
                    // reload the user
                    const user = await reloadUser();
                    const userData = await getUser(user.uid);
                    // store user data in firestore
                    const updatedFields: User = {
                        ...userData,
                        email: user.email,
                        isAnonymous: user.isAnonymous,
                        emailVerified: user.emailVerified,
                        loggedIn: true,
                    };
                    return { data: updatedFields };
                } catch (e: any) {
                    console.log(`Error with refreshing user:`);
                    console.log(e);
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
