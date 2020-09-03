import axios from "axios";
import qs from "qs";
import {TOKEN_HEADER, TOKEN_STORAGE} from "./types";
import {AsyncStorage} from "react-native";


export class UserService {
    constructor() {
        axios.defaults.withCredentials = true;
    }
    readonly baseUrl: string = GetBaseUrl();
    tryAuth = (email: string, password: string): Promise<any> => {
        const data = {
            user: {
                email,
                password
            }
        }
        return axios
            .post(`${this.baseUrl}/api/auth/login`, qs.stringify(data))
            .then((res) => {
                const response = res.data;
                const status = response.status ? response.status.toUpperCase() : null;
                if (status != 'OK') {
                    const error = response.error_msg || null;
                    if (error){
                        throw error;
                    }
                }
                // return true;
                const token = response?.data?.token || null;
                return token;
            })
            .catch((e) => {
                throw e;
            })
    };
    checkAuth = async (): Promise<any> => {
        const token = await AsyncStorage.getItem(TOKEN_STORAGE);
        return axios
            .get(`${this.baseUrl}/api/auth/base`, {
                headers:{
                    [TOKEN_HEADER]:token
                }
            })
            .then((res) => {
                const response = res.data
                if (response.status.toUpperCase() != 'OK') {
                    throw response.error_msg;
                }
                const user = response.data.user;

                return !!user;
            })
            .catch((e) => {
                throw e;
            })
    };
    logout = async (): Promise<any> => {
        const token = await AsyncStorage.getItem(TOKEN_STORAGE);

        return axios
            .get(`${this.baseUrl}/api/auth/logout`, {
                headers: {
                    [TOKEN_HEADER]: token
                }
            })
            .then(async (res) => {
                const response = res.data
                if (response.status.toUpperCase() != 'OK') {
                    throw response.error_msg;
                }
                await AsyncStorage.removeItem(TOKEN_STORAGE);
                return true
            })
            .catch((e) => {
                throw e;
            })
    }
}
export const GetBaseUrl = (): string => {
    // return `http://10.76.131.67:8888`;
    return `https://trimere.site`;
}