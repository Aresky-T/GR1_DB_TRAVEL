import axios from "axios"

const chatURL = "http://localhost:8080/api/v1/chat"

export const connectEmployeeForGuestCustomerApi = ({ fullName, email }) => {
    return axios.post(`${chatURL}/connect/guest`, { fullName, email });
}

export const connectEmployeeForRegisteredCustomerApi = (token) => {
    return axios.post(`${chatURL}/connect/registered`, null, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}