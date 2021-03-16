import axios, { AxiosRequestConfig, AxiosResponse } from "axios";



const Request = async <T>(params: AxiosRequestConfig) => {
    try {

        if (params.url && params.url.indexOf(process.env.REACT_APP_API_URL as string) === -1) {
            params.url = process.env.REACT_APP_API_URL + params.url;
        }
        const fromRequest: AxiosResponse<T> = await axios.request<T>(params);
        return fromRequest;
    } catch (error) {
        throw error;
    }
}

export default Request;