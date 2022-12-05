import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthApi } from 'src/services';
import { UserApi } from 'src/services/user-api';
import { PrivateUserData } from 'src/types';

/**
 * Define the initial user
 */
const initialUser: PrivateUserData = {
    id: '',
    isAnonymous: false,
    emailVerified: false,
    loggedIn: false,
};

/**
 * Define the intiaial user slice object
 * @resources
 * https://redux-toolkit.js.org/api/createSlice
 */
const userSlice = createSlice({
    name: 'user',
    initialState: initialUser,

    /**
     * Define the reducers for this slice
     */
    reducers: {
        incrementCount: (state) => {
            // increment, or set to 1
            state.count ? (state.count += 1) : (state.count = 1);
        },
        decrementCount: (state) => {
            // decrement, or set to -1
            state.count ? (state.count -= 1) : (state.count = -1);
        },
    },

    /**
     * For syncing with rtk-query, updating the local state when a query fetches
     *
     * @remarks
     * Only need these extra reducers for many actions that are handling the universal state for the user
     */
    extraReducers: (builder) => {
        /**
         * When user signs up, set the local state to the returned private user data
         *
         * @param {*} _state
         * @param {PayloadAction<PrivateUserData>} action
         * @return {*}
         */
        builder.addMatcher(
            AuthApi.endpoints.signUp.matchFulfilled,
            (_state, action: PayloadAction<PrivateUserData>) => {
                return { ...action.payload };
            },
        );

        /**
         * When user signs in, set the local state to the returned private user data
         *
         * @param {*} _state
         * @param {PayloadAction<PrivateUserData>} action
         * @return {*}
         */
        builder.addMatcher(
            AuthApi.endpoints.signIn.matchFulfilled,
            (_state, action: PayloadAction<PrivateUserData>) => {
                return { ...action.payload };
            },
        );

        /**
         * Update the user's email
         *
         * @param {*} _state
         * @param {PayloadAction<PrivateUserData>} action
         * @return {*}
         */
        builder.addMatcher(
            AuthApi.endpoints.updateEmail.matchFulfilled,
            (state, action: PayloadAction<{ email: string }>) => {
                return { ...state, ...action.payload };
            },
        );

        /**
         * When user changes their image, set it in the global user state
         *
         * @param {*} _state
         * @param {PayloadAction<string>} action
         * @return {*}
         */
        builder.addMatcher(
            UserApi.endpoints.setUserImage.matchFulfilled,
            (state, action: PayloadAction<string>) => {
                return { ...state, image: action.payload };
            },
        );

        /**
         * When the user updates certain fields, update the local state.
         *
         * @param {*} _state
         * @param {PayloadAction<string>} action
         * @return {*}
         */
        builder.addMatcher(
            UserApi.endpoints.updateUserFields.matchFulfilled,
            (state, action: PayloadAction<PrivateUserData>) => {
                return { ...state, ...action.payload };
            },
        );

        /**
         * When user signs out, reset the state to the initial user
         *
         * @param {*} _state
         * @param {PayloadAction<PrivateUserData>} action
         * @return {*}
         */
        builder.addMatcher(AuthApi.endpoints.signOut.matchFulfilled, () => initialUser);

        /**
         * When user deletes their account, reset the state to the initial user
         *
         * @param {*} _state
         * @param {PayloadAction<PrivateUserData>} action
         * @return {*}
         */
        builder.addMatcher(AuthApi.endpoints.deleteAccount.matchFulfilled, () => initialUser);
    },
});

/**
 * Export the corresponding redux actions
 */
export const { incrementCount, decrementCount } = userSlice.actions;
export default userSlice.reducer;
