import axios from "axios"
import { configAPI } from "../index";

// const tourURL = "https://gr1travelbackend-production.up.railway.app/api/v1/tours"
const tourURL = "http://localhost:8080/api/v1/tours"

export const getAllToursApi = () => {
    return axios.get(tourURL);
}

export const createTourApi = (data, token) => {
    const config = configAPI(token)
    return axios.post(tourURL, data, config);
}

export const getTourByTourCodeApi = (tourCode) => {
    return axios.get(`${tourURL}/get-tour-by-tour-code/${tourCode}`);
}