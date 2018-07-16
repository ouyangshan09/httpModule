/**
 * Http实现
*/
import Axios from 'axios';
import Qs from 'qs';

class Http {
    static CancelToken = Axios.CancelToken;

    static getCancelMethod () {
        return this.CancelToken.source();
    }

    static isCancel = (...arg) => {
        return Axios.isCancel(...arg);
    }

    constructor (config = {}) {
        this.$cancel = undefined;
        const defaultConfig = {
            timeout: 10000,
            withCredentials: true,
            validateStatus: status => status >= 200 && status < 300,
            paramsSerializer: params => Qs.stringify(params, { arrayFormat: 'brackets' }),
            cancelToken: new Http.CancelToken((cancel) => {
                this.$cancel = cancel;
            })
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

    /**
     * 取消全部请求？
    */
    cancelAll = () => {
        this.$cancel && this.$cancel();
    }
}

export function createHttp (config = {}) {
    return new Http(config);
}

export { bindUrls as BindURL } from './bindURL';
export { BaseHttp } from './baseHttp';
export default Http;
