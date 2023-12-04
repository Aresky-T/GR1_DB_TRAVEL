import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice"
import profileReduce from "./slices/profile.slice"
import loadingReducer from "./slices/loading.slice"
import mailReducer from "./slices/mail.slice"
import chatReducer from "./slices/chat.slice"
import bookingReducer from "./slices/booking.slice"

const rootReducer = {
    auth: authReducer,
    profile: profileReduce,
    loading: loadingReducer,
    mail: mailReducer,
    chat: chatReducer,
    booking: bookingReducer,
}

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export default store;