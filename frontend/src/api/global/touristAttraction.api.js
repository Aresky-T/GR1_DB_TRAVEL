import axios from "axios";

const tourAttURL = "http://localhost:8080/api/v1/tourist-attraction"

export const getAllTouristAttractionsApi = () => {
    return axios.get(`${tourAttURL}/get-all`);
}

export const getDataBySearchApi = (search) => {
    return axios.get(`${tourAttURL}/search`, {
        params: {
            search: search
        }
    })
}

export const getTouristAttractionDetailsApi = (id) => {
    return axios.get(`${tourAttURL}/${id}`)
}