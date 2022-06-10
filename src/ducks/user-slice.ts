import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: '',
        email: '',
        loggedIn: false,
    },
    reducers: {
        updateEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
            state.loggedIn = true;
        }
    }
});

export const { updateEmail } = userSlice.actions;
export default userSlice.reducer;