/**
 * 基础抽象业务流程相关的Http实现
 * @author Ouyang
 * @version 1.0
*/

import { Http } from './http';

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
        const self = this;
        this.$http = Http.create({
            baseURL: this.getBaseURL()
        });
        this.interceptorCode = this.$http.addResponseInterceptor(function onSuccess (response) {
            const { data } = response;
            if (data) {
                const { data: serial, validate } = self.getResponseHandle(data);
                if (validate) {
                    return serial;
                }
            }
            return Promise.reject(new Error({ data }));
        }, function onFailure (error) {
            return Promise.reject(error);
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
        }
    }

    /**
     * 基础URL抽象
    */
    getBaseURL () {
        throw new Error(`请重写该方法, 并返回基础url字符串`);
    }

    /**
     * 处理ResponeCode的统一处理抽象，返回对象结构 {data: object, validate: bool}
    */
    getResponseHandle(data) {
        throw new Error(`请重写该方法, 并返回对象 - {data: object, validate: bool}`);
    }

    get(url, config = {}) {
        return new Promise((resolve) => {
            resolve(this.$http.get(url, {
                headers: BaseHttp.resolveHeaderConfig('get', this.defaultMehotdHeaders),
                ...config
            }))
        })
    }

    post(url, data = undefined, config = {}) {
        return new Promise((resolve) => {
            resolve(this.$http.post(url, data, {
                headers: BaseHttp.resolveHeaderConfig('post', this.defaultMehotdHeaders),
                ...config
            }))
        })
    }

    put(url, data = undefined, config = {}) {
        return new Promise((resolve) => {
            resolve(this.$http.put(url, data, {
                headers: BaseHttp.resolveHeaderConfig('put', this.defaultMehotdHeaders),
                ...config
            }))
        })
    }

    delete(url, config = {}) {
        return new Promise((resolve) => {
            resolve(this.$http.delete(url, {
                headers: BaseHttp.resolveHeaderConfig('delete', this.defaultMehotdHeaders),
                ...config
            }))
        })
    }

    request(config) {
        return new Promise((resolve) => {
            resolve(this.$http.request({
                headers: BaseHttp.resolveHeaderConfig(config.method, this.defaultMehotdHeaders),
                ...config
            }))
        })
    }
}

export default BaseHttp;
export {
    BaseHttp
}
