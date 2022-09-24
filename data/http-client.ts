import axios from 'axios';

export const httpClient = axios.create({
    baseURL: 'http://10.100.102.8:3000'
});