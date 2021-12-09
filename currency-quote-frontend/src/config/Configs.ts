import axios, { AxiosInstance } from "axios";

export function getHostBackend(): string {
    return `localhost:3000`;
}

export function getAxios(): AxiosInstance {
    return axios.create({
        baseURL: `http://${getHostBackend()}`
    });
}