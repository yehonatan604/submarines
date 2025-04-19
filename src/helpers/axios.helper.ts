import axios from "axios";
import Constants from 'expo-constants';
import { getToken } from "./storage.helper";

const apiClient = axios.create({
    baseURL: Constants?.expoConfig?.extra?.apiUrl
});

apiClient.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
        config.headers['auth-token'] = token;
    }
    return config;
},
    (error) => {
        return Promise.reject(error);
    }
);

export const sendApiRequest = {
    get: apiClient.get,
    post: apiClient.post,
    put: apiClient.put,
    patch: apiClient.patch,
    delete: apiClient.delete,
};