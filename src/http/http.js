/**
 * Http实现
*/
import Axios from 'axios';
import Qs from 'qs';

class Http {
    constructor (config = {}) {
        const defaultConfig = {
            timeout: 10000,
            withCredentials: true,
            validateStatus: status => status >= 200 && status < 300,
            paramsSerializer: params => Qs.stringify(params, { arrayFormat: 'brackets' })
        };
        this.$http = Axios.create({...defaultConfig, ...config});
    }

    addRequestInterceptor = (onResolve, onRejected) => {
        return this.$http.interceptors.request.use(onResolve, onRejected);
    }

    removeRequestInterceptor = (id) => {
        this.$http.interceptors.request.eject(id);
    }

    addResponseInterceptor = (onResolve, onRejected) => {
        return this.$http.interceptors.response.use(onResolve, onRejected);
    }

    removeResponseInterceptor = (id) => {
        this.$http.interceptors.response.eject(id);
    }

    get = (url, config) => {
        return this.$http.get(url, config);
    }

    delete = (url, config) => {
        return this.$http.delete(url, config);
    }

    post = (url, data, config) => {
        return this.$http.post(url, data, config);
    }

    put = (url, data, config) => {
        return this.$http.put(url, data, config);
    }

    patch = (url, data, config) => {
        return this.$http.patch(url, data, config);
    }

    request = (config) => {
        return this.$http.request(config);
    }
}

export function createHttp (config = {}) {
    return new Http(config);
}

export default Http;
