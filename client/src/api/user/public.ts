import axios, { InternalAxiosRequestConfig } from "axios";
import configURL from '../../const/config.ts'
import queryString from "query-string";


const publicUser = axios.create({
    baseURL: configURL.BASE_URL,
    paramsSerializer: {
        encode: params => queryString.stringify(params)
    }
})


publicUser.interceptors.request.use(async function (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
    return {
        ...config,
    } as InternalAxiosRequestConfig
}, async function (error) {
    throw error
})

publicUser.interceptors.response.use(function (response) {
    if (response && response.data) {
        return response.data
    }
    return response
}, function (error) {
    throw error
})

export default publicUser