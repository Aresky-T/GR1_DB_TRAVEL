import axios from "axios"

const mailUrl = "http://localhost:8080/api/v1/mail"

export const sendMailToEmployeeApi = (form) => {
    return axios.post(`${mailUrl}/send`, form);
}