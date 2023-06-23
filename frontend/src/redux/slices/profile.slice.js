import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        data: null
    },
    reducers: {
        setProfile: (state, action) => {
            state.data = action.payload;
        }
    }
})

export const {
    setProfile
} = profileSlice.actions;
export default profileSlice.reducer;