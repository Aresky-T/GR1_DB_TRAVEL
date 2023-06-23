import axios from "axios";
import { onLoading } from "../../redux/slices/loading.slice";

// const fileURL = "https://gr1travelbackend-production.up.railway.app/files";
const fileURL = "http://localhost:8080/api/v1/files"

export const uploadMultipartFileApi = (files, token, dispatch) => {

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        }
    }

    dispatch(onLoading());
    return axios.post(`${fileURL}/cloudinary/upload`, files, config);
} 