import axios from "axios";
import { configAPI } from "..";
import { onLoading } from "../../redux/slices/loading.slice";

const fileURL = "http://localhost:8080/files";

export const uploadMultipartFile = (files, token, dispatch) => {

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        }
    }
    dispatch(onLoading());
    return axios.post(`${fileURL}/cloudinary/upload`, files, config);
}