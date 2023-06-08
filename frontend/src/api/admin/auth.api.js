import axios from "axios";

const baseURL = 'http://localhost:8080/api/v1/auth'

export const loginAdminApi = async (data) => {
    return await axios.post(`${baseURL}/login`, data);
}

export const validateTokenApi = async (accessToken) => {
    return await axios.get(`${baseURL}/validate-token`, {
        params: {
            token: accessToken
        }
    })
}