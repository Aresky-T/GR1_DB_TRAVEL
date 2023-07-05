import axios from "axios";

// const fileURL = "https://gr1travelbackend-production.up.railway.app/files";
const fileURL = "http://localhost:8080/api/v1/files"

export const uploadMultipartFileApi = (files, token) => {

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        }
    }
    return axios.post(`${fileURL}/cloudinary/upload`, files, config);
} 