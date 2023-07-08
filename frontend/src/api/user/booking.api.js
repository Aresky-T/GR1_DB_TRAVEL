import axios from "axios";
import { configAPI } from ".."
import { onLoading } from "../../redux/slices/loading.slice";

const baseURL = "http://localhost:8080/api/v1/book-tour"

export const bookTourForUserApi = (data, token, dispatch) => {
    const config = configAPI(token);
    dispatch(onLoading());
    return axios.post(baseURL, data, config);
}

export const getAllBookedToursApi = (token) => {
    return axios.get(`${baseURL}/user`, configAPI(token));
}

export const getBookedTourForUserApi = (tourId, token) => {
    const config = configAPI(token);
    return axios.get(`${baseURL}/get-by-tour/${tourId}`, config);
}

export const sendRequestCancelBookedTourApi = (form, token) => {
    return axios.post(`${baseURL}/request-cancel-booked-tour/send`, form, configAPI(token));
}