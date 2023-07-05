import axios from "axios"
import { configAPI } from ".."

const baseUrl = "http://localhost:8080/api/v1/tourist-attraction"

export const createTouristAttractionApi = (form, token) => {
    const config = configAPI(token)
    return axios.post(baseUrl, form, config);
}

export const updateTouristAttractionApi = (form, token) => {
    const config = configAPI(token)
    return axios.put(baseUrl, form, config);
}

export const deleteTouristAttractionApi = (id, token) => {
    const config = configAPI(token)
    return axios.delete(`${baseUrl}/${id}`, config)
}