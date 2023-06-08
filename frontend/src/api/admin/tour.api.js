import axios from "axios"

const tourURL = "http://localhost:8080/api/v1/tours"

export const getAllToursApi = () => {
    return axios.get(tourURL);
}