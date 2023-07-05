import axios from 'axios'

const tourURL = "http://localhost:8080/api/v1/tours";


export const getLatestToursApi = (count) => {
    return axios.get(`${tourURL}/get-latest-tours/${count}`)
}

export const getAllToursByFilterApi = (fields) => {
    return axios.get(`${tourURL}/filter`, {
        params: fields
    })
}

export const getTourByIdApi = (id) => {
    return axios.get(`${tourURL}/${id}`);
}

export const getTourByTourCodeApi = (tourCode) => {
    return axios.get(`${tourURL}/get-tour-by-tour-code/${tourCode}`);
}