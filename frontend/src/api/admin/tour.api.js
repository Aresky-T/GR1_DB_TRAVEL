import axios from "axios"
import { configAPI } from "../index";

// const tourURL = "https://gr1travelbackend-production.up.railway.app/api/v1/tours"
const tourURL = "http://localhost:8080/api/v1/tours"

export const getAllToursForAdminApi = (fields) => {
    return axios.get(tourURL, {
        params: fields
    })
}

export const createTourApi = (data, token) => {
    const config = configAPI(token)
    return axios.post(tourURL, data, config);
}

export const updateTourWithPatchMethodApi = (tourId, fields, token) => {
    const config = configAPI(token);
    return axios.patch(`${tourURL}/${tourId}`, fields, config)
}

export const deleteTourByIdApi = (tourId, token) => {
    const config = configAPI(token);
    return axios.delete(`${tourURL}/${tourId}`, config);
}