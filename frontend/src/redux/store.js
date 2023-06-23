import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice"
import profileReduce from "./slices/profile.slice"
import loadingReducer from "./slices/loading.slice"

const rootReducer = {
    auth: authReducer,
    profile: profileReduce,
    loading: loadingReducer
}

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export default store;