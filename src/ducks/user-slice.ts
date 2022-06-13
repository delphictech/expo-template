import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'src/types/user';

const initialUser:User = {
    uid: '',
    email: '',
    phoneNumber: '',
    isAnonymous: false,
    emailVerified: false,
    loggedIn: false,
};

export const userSlice = createSlice({
    /*
        Redux state management of the user component
    */
    name: 'user',
    initialState: initialUser,
    reducers: {
        signIn: (state, action: PayloadAction<User>) => {
            // updates the user object
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.phoneNumber = action.payload.phoneNumber;
            state.isAnonymous = action.payload.isAnonymous;
            state.emailVerified = action.payload.emailVerified;

            state.loggedIn = true;
        },
        signOut: () => initialUser, // reset to initial state
        updateEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
            state.loggedIn = true;
        },
    }
});

export const { signIn, signOut, updateEmail } = userSlice.actions;
export default userSlice.reducer;