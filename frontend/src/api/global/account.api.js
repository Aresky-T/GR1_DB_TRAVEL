import axios from "axios";
import {onLoading} from "../../redux/slices/loading.slice";

const accountURL = "http://localhost:8080/api/v1/account"

export const forgotPasswordApi = (email, dispatch) => {
    dispatch(onLoading())
    return axios.post(`${accountURL}/forgot-password`, null, {
        params: {
            email: email
        }
    })
}