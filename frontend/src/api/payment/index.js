import axios from "axios"

const baseURL = "http://localhost:8080/payment"

export const paymentBookedTourWithVNPayApi = (bookedTourId, accessToken) => {
    return axios.get(`${baseURL}/vnpay/booked-tour`, {
        params: {
            bookedTourId
        },
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
}