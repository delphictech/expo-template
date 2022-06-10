import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: '',
        email: '',
    },
    reducers: {
        updateEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        }
    }
});

export const { updateEmail } = userSlice.actions;
export default userSlice.reducer;