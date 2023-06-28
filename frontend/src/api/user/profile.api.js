import axios from 'axios';
import { configAPI } from '..';

const baseURL = 'http://localhost:8080/api/v1/profile';

export const getProfileApi = (token) => {
  const config = configAPI(token);
  return axios.get(baseURL, config);
};
