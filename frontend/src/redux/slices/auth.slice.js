import { createSlice } from "@reduxjs/toolkit";
import { validateTokenApi } from "../../api/admin/auth.api";
import { createCustomStorage, removeLocalStorage } from "../../config/localStorageConfig";

const account = JSON.parse(localStorage.getItem("accountInfo"));

const initState = {
    accessToken: account?.accessToken,
    role: account?.role
};

(function () {
    if (account) {
        validateTokenApi(account.accessToken)
            .then(res => {
                if (res.data === "Valid") {
                }
            })
            .catch(err => {
                const response = err.response;
                if (response?.data?.message) {
                    removeLocalStorage("accountInfo");
                }
            })
    }
})();

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
            state.accessToken = null;
            state.role = null;
            removeLocalStorage("accountInfo");
        }
    }
})

export  const {
    saveAccountInfo,
    logout
} = authSlice.actions;
export default authSlice.reducer;