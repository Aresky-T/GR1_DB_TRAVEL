import { createSlice } from "@reduxjs/toolkit";
import { createCustomStorage, removeLocalStorage } from "../../config/localStorageConfig";

const account = JSON.parse(localStorage.getItem("accountInfo"));

const initState = {
    accessToken: account?.accessToken,
    role: account?.role
};

const authSlice = createSlice({
    name: "auth",
    initialState: initState,
    reducers: {
        saveAccountInfo: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.role = action.payload.role;
            const storage = createCustomStorage("accountInfo");
            storage.set("accessToken", action.payload.accessToken);
            storage.set("role", action.payload.role);
        },
        logout: (state) => {
            removeLocalStorage("accountInfo");
            sessionStorage.clear();
            state.accessToken = null;
            state.role = null;
        }
    }
})

export const {
    saveAccountInfo,
    logout
} = authSlice.actions;
export default authSlice.reducer;