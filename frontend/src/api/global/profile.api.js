import axios from "axios";
import { configAPI } from "..";

// const profileURL = "https://gr1travelbackend-production.up.railway.app/api/v1/profile";
const profileURL = "http://localhost:8080/api/v1/profile"

export const getProfile = async (token) => {
    const config = configAPI(token);
    return await axios.get(profileURL, config);
}