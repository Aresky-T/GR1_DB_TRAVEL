import { useSelector } from "react-redux";

export const profileSelector = (state) => state.profile;
export const authSelector = (state) => state.auth;
export const loadingSelector = (state) => state.loading.status;
export const mailSelector = (state) => state.mail;
export const chatSelector = (state) => state.chat;
export const bookingSelector = (state) => state.booking;

export const useAuth = () => {
    return useSelector(authSelector);
}

export const useProfile = () => {
    return useSelector(profileSelector);
}

export const useMail = () => {
    return useSelector(mailSelector);
}

export const useChat = () => {
    return useSelector(chatSelector);
}

export const useBooking = () => {
    return useSelector(bookingSelector);
}