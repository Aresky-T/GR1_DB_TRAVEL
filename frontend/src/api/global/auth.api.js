import axios from "axios";
import { onLoading } from "../../redux/slices/loading.slice";
import { configAPI } from "..";

// const authURL = 'https://gr1travelbackend-production.up.railway.app/api/v1/auth'
const authURL = 'http://localhost:8080/api/v1/auth'

export const loginUserApi = (data) => {
    return axios.post(`${authURL}/login`, data);
}

export const loginAdminApi = (data) => {
    return axios.post(`${authURL}/login`, data);
}

export const registerUserApi = (data, dispatch) => {
    dispatch(onLoading());
    return axios.post(`${authURL}/signup`, data);
}

export const validateTokenApi = (accessToken) => {
    return axios.get(`${authURL}/validate-token`, {
        params: {
            token: accessToken
        }
    })
}

export const validateAccountApi = (accessToken) => {
    return axios.get(`${authURL}/validate-account`, configAPI(accessToken));
}