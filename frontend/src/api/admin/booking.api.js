import axios from "axios"
import { configAPI } from ".."

const bookingURL = "http://localhost:8080/api/v1/book-tour"

export const getAllBookedToursApi = (token, fields) => {
    return axios.get(bookingURL, {
        params: fields,
        headers: configAPI(token).headers,
    });
}

export const getDetailBookedTourByIdApi = (token, bookedTourId) => {
    return axios.get(`${bookingURL}/${bookedTourId}`, configAPI(token));
}

export const acceptRequestCancelBookedTourApi = (token, requestId) => {
    return axios.delete(`${bookingURL}/request-cancel-booked-tour/accept/${requestId}`, configAPI(token));
}

export const changeStatusBookedTourApi = (form, token) => {
    return axios.put(`${bookingURL}/change-status`, form, configAPI(token));
}