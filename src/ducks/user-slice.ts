import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthApi } from 'src/services';
import { PrivateUserData } from 'src/types';

/** 
 * Define the initial user
*/
const initialUser: PrivateUserData = {
    id: '',
    isAnonymous: false,
    emailVerified: false,
    loggedIn: false
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
        // emailSignIn: (state, action: PayloadAction<PrivateUserData>) => {
        //     // updates the user object to the signed in user
        //     return { ...state, ...action.payload, loggedIn: true };
        // },
        // guestSignIn: (_state, action: PayloadAction<string>) => {
        //     // set the id, keep anonymous and logged in
        //     return { ...initialUser, id: action.payload, isAnonymous: true, loggedIn: true };
        // },
        // signOut: () => initialUser, // reset to initial state
        // updateEmail: (state, action: PayloadAction<string>) => {
        //     // update the email, keep everything else updated
        //     return { ...state, email: action.payload, loggedIn: true }
        // },
        incrementCount: (state) => {
            // increment, or set to 1
            state.count ? state.count += 1 : state.count = 1;
        },
        decrementCount: (state) => {
            // decrement, or set to -1
            state.count ? state.count -= 1 : state.count = -1;
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
        builder.addMatcher(AuthApi.endpoints.signUp.matchFulfilled,
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
         builder.addMatcher(AuthApi.endpoints.signIn.matchFulfilled,
            (_state, action: PayloadAction<PrivateUserData>) => {
                return { ...action.payload };
            },
        );

        /**
         * When user signs out, reset the state to the initial user
         *
         * @param {*} _state
         * @param {PayloadAction<PrivateUserData>} action
         * @return {*} 
         */
         builder.addMatcher(AuthApi.endpoints.signOut.matchFulfilled,
            () => initialUser,
        );

        /**
         * When user deletes their account, reset the state to the initial user
         *
         * @param {*} _state
         * @param {PayloadAction<PrivateUserData>} action
         * @return {*} 
         */
         builder.addMatcher(AuthApi.endpoints.deleteAccount.matchFulfilled,
            () => initialUser,
        );
   },
    
});

/**
 * Export the corresponding redux actions
 */
export const { incrementCount, decrementCount } =
    userSlice.actions;
export default userSlice.reducer;
