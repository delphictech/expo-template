import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PrivateUserData } from 'src/types/user';

const initialUser: PrivateUserData = {
    id: '',
    isAnonymous: false,
    emailVerified: false,
    loggedIn: false
};

export const userSlice = createSlice({
    /*
        Redux state management of the user component
    */
    name: 'user',
    initialState: initialUser,
    reducers: {
        emailSignIn: (state, action: PayloadAction<PrivateUserData>) => {
            // updates the user object to the signed in user
            return { ...state, ...action.payload, loggedIn: true };
        },
        guestSignIn: (state, action: PayloadAction<string>) => {
            // set the id, keep anonymous and logged in
            return { ...initialUser, id: action.payload, isAnonymous: true, loggedIn: true };
        },
        signOut: () => initialUser, // reset to initial state
        updateEmail: (state, action: PayloadAction<string>) => {
            // update the email, keep everything else updated
            return { ...state, email: action.payload, loggedIn: true }
        },
        incrementCount: (state) => {
            // increment, or set to 1
            state.count ? state.count += 1 : state.count = 1;
        },
        decrementCount: (state) => {
            // decrement, or set to -1
            state.count ? state.count -= 1 : state.count = -1;
        },
    },
});

export const { emailSignIn, guestSignIn, signOut, updateEmail, incrementCount, decrementCount } =
    userSlice.actions;
export default userSlice.reducer;
