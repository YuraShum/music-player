import axios, { InternalAxiosRequestConfig } from 'axios'
import queryString from 'query-string'
import configURL from '../../const/config.ts'

const privateUser = axios.create({
    baseURL: configURL.BASE_URL,
    paramsSerializer: {
        encode: params => queryString.stringify(params)
    },
})

privateUser.interceptors.request.use(async function (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
    return {
        ...config,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('activationToken')}`
        }
    } as InternalAxiosRequestConfig
    
}, async function (error) {
    throw error
});

privateUser.interceptors.response.use(function (response) {
    if (response && response.data) {
        return response.data
    }
    return response
}, function (error) {
    throw error.response.data
})

export default privateUser
