import _axios, { AxiosResponse } from "axios";

const axios = _axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_HOST,
    validateStatus: (statusCode: number) => {
        return (statusCode === 200 || statusCode === 400 || statusCode === 401)
    }
})

export type IResponseAxios<T = any> = AxiosResponse<{ message: string, data: T }>

export default axios;