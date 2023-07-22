import axios from "axios";
import { configAPI } from "..";

// const profileURL = "https://gr1travelbackend-production.up.railway.app/api/v1/profile";
const profileURL = "http://localhost:8080/api/v1/profile"

export const getProfileApi = async (token) => {
    const config = configAPI(token);
    return await axios.get(profileURL, config);
}

export const updateProfileApi = async (token, form) => {
    return await axios.put(profileURL, form, configAPI(token));
}

export const updateAvatarApi = (token, newAvatar) => {
    return axios.patch(`${profileURL}/avatar`, null, {
        headers: configAPI(token).headers,
        params: { newAvatar: newAvatar },
    })
}