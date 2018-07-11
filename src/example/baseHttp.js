/**
 * 基础Http Request请求封装，基于业务逻辑封装以下功能
 * 登录过期，失败 自动跳转
 * 处理code非0的业务流程
 * @author Ouyang
 * @version 1.0
*/

import {
    throttle,
    isFunction,
    isObject
} from 'lodash';
import {
    createHttp
} from '../http';
import { resolve } from 'path';

const STATUS = {
    SUCCESS: 1,
    FAILURE: 2
};

const CODE_CONFIG = {
    // 703: {
    //     code: 703,
    //     // 显示给用户看的
    //     tip: {
    //         enable: true,
    //         info: '',
    //         method: 'warning'
    //     },
    //     serialized: (data, args) => null,
    //     validate: () => null
    // },
    0: (data) => {
        return data 
    },
    2: (data) => {
        // xxx
        return {
            data: {},
            validate: true
        };
    },
    3: {
        serialized: (data, args) => null,
        validate: () => null
    }
};

function handleResponseCode ({ code, data, ...args }) {
    return CODE_CONFIG[code](data);
    // const methodConfig = CODE_CONFIG[code];
    // if (methodConfig) {
    //     let serializedResult = null;
    //     if (isObject(methodConfig.tip) && methodConfig.tip.enable) {
    //         // Message[methodConfig.tip.method](methodConfig.tip.info);
    //         // Message.info(methodConfig.tip)
    //     } 
    //     if (isFunction(methodConfig.serialized)) {
    //         serializedResult = methodConfig.serialized(data, ...args);
    //     }
    //     if (methodConfig.validate) {
    //         if (methodConfig.validate()) {
    //             return Promise.resolve(serializedResult || data)
    //         }
    //     }
    //     return Promise.reject(new Error(methodConfig));
    // }
}

const http = new BaseHttp();

http.get().then(() => '具体的业务流程').cathc()

class BaseHttp {
    constructor () {
        super();
        this.$http = createHttp({
            baseURL: this.getBaseURL()
        });
        this.$http.addResponseInterceptor(function onSuccess (response) {
            const { data } = response;
            if (data) {
                // 处理Code
                const data = handleResponseCode(data);
                if (data === true) {
                    Promise.resolve(data)
                } else {
                    return Promise.reject()
                }
            }

        }, function onFailure (errors) {
            return Promise.reject(errors);
        });
        this.defaultMehotdHeaders = {
            //
        };
    }

    getBaseURL () {
        throw new Error(`请重写该方法, 并返回基础url字符串`);
    }

    get (url, config = {}) {
        //
    }

    post (url, data = undefined, config = {}) {
        //
    }

    put (url, data = undefined, config = {}) {
        //
    }

    delete (url, config = {}) {
        //
    }

    request (config) {
        //
    }
}

export default BaseHttp;
