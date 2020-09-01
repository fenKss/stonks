import axios from "axios";
import qs from "qs";

export class UserService {
    constructor() {
        axios.defaults.withCredentials = true
    }
    baseUrl: string = `http://10.76.131.67:8888`;
    // const this.baseUrl: string = `http://trimere.site`;
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
                const response = res.data
                if (response.status.toUpperCase() != 'OK') {
                    throw response.error_msg;
                }
                return true;
            })
            .catch((e) => {
                throw e;
            })
    };
    checkAuth = (): Promise<any> => {
        return axios
            .get(`${this.baseUrl}/api/auth/base`)
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
    logout = (): Promise<any> => {
        return axios
            .get(`${this.baseUrl}/api/auth/logout`)
            .then((res) => {
                const response = res.data
                if (response.status.toUpperCase() != 'OK') {
                    throw response.error_msg;
                }
                return true
            })
            .catch((e) => {
                throw e;
            })
    }
}