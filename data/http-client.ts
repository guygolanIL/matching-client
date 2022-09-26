import axios, { AxiosRequestConfig } from 'axios';
import { getItem } from '../util/async-storage';

export const httpClient = axios.create({
    baseURL: 'http://10.100.102.8:3000',
});

async function tokenInterceptor(config: AxiosRequestConfig) {
    const userToken = await getItem('@user-token');
    config.headers = { ...config.headers, 'Authorization': `Bearer ${userToken}` }
    return config;
}

httpClient.interceptors.request.use(tokenInterceptor);
