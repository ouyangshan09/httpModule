/**
 * 基础Http Request请求封装，基于业务逻辑封装以下功能
 * 登录过期，失败 自动跳转
 * 处理code非0的业务流程
 * @author Ouyang
 * @version 1.0
*/
import {
    createHttp
} from '../http';

class BaseHttp {
    /**
     * 创建请求方法对应的header配置, 与this.defaultMehotdHeaders属性联动
     * @param {string} method 
     * @param {object} config 
     */
    static resolveHeaderConfig (method, config) {
        const commonHeaders = config['common'] || config['COMMON'] || {};
        const methodHeaders = config[method.toLowerCase()] || config[method.toUpperCase()] || {};
        return {
            ...commonHeaders,
            ...methodHeaders
        }
    }

    constructor () {
        this.$http = createHttp({
            baseURL: this.getBaseURL()
        });
        this.$http.addResponseInterceptor(function onSuccess (response) {
            const { data } = response;
            if (data) {
                const { data, validate } = this.getResponseHandle(data);
                if (validate) {
                    return data;
                }
            }
            return Promise.reject(new Error({ data }));
        }, function onFailure (errors) {
            return Promise.reject(errors);
        });
        this.defaultMehotdHeaders = {
            // common: {
            //     'X-Requested-With': 'XMLHttpRequest'
            // },
            // get: {
            //     'Content-Type': 'application/x-www-form-urlencoded'
            // },
            // post: {
            //     'Content-Type': 'application/x-www-form-urlencoded'
            // }
        };
    }

    getBaseURL () {
        throw new Error(`请重写该方法, 并返回基础url字符串`);
    }

    getResponseHandle (data) {
        throw new Error(`请重写该方法, 并返回对象 - {data: object, validate: bool}`);
    }

    get (url, config = {}) {
        return new Promise(this.$http.get(url, {
            headers: BaseHttp.resolveHeaderConfig('get', this.defaultMehotdHeaders),
            ...config
        }))
    }

    post (url, data = undefined, config = {}) {
        return new Promise(this.$http.post(url, data, {
            headers: BaseHttp.resolveHeaderConfig('post', this.defaultMehotdHeaders),
            ...config
        }))
    }

    put (url, data = undefined, config = {}) {
        return new Promise(this.$http.put(url, data, {
            headers: BaseHttp.resolveHeaderConfig('put', this.defaultMehotdHeaders),
            ...config
        }))
    }

    delete (url, config = {}) {
        return new Promise(this.$http.delete(url, {
            headers: BaseHttp.resolveHeaderConfig('delete', this.defaultMehotdHeaders),
            ...config
        }))
    }

    request (config) {
        return new Promise(this.$http.request({
            headers: BaseHttp.resolveHeaderConfig(config.method, this.defaultMehotdHeaders),
            ...config
        }))
    }
}

export default BaseHttp;
