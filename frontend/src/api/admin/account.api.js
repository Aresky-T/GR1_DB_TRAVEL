import axios from "axios";
import { configAPI } from "..";

const accountURL = "http://localhost:8080/api/v1/account";

export const getAllAccountsApi = (token, fields) => {
    return axios.get(accountURL, {
        params: fields,
        headers: configAPI(token).headers,
    });
}

export const deleteAccountApi = (token, accountId) => {
    return axios.delete(`${accountURL}/${accountId}`, configAPI(token));
}

export const lockAccountUserApi = (accountId, token) => {
    return axios.put(`${accountURL}/lock-account/${accountId}`, null, configAPI(token));
}

export const activateAccountUserApi = (accountId, token) => {
    return axios.put(`${accountURL}/activate-account/${accountId}`, null, configAPI(token));
}