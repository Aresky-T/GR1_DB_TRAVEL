import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        status: false
    },
    reducers: {
        onLoading: (state) => {
            state.status = true;
        },
        offLoading: (state) => {
            state.status = false;
        }
    }
})

export const { offLoading, onLoading } = loadingSlice.actions;
export default loadingSlice.reducer;