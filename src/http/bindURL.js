/**
 * 动态绑定url请求, 自动化创建各种类型请求方法
 * @author Ouyang
*/
import Qs from 'qs';
import {
    mapParamsToPathVariables,
    methodPatternMapper
} from './defaultMethodPatter';

/**
 * 将Http请求绑定到模块方法中
 * @param method 请求方法
 * @param moduleInstance 模块实例对象或模块类原型对象
 * @param shouldSendData
 * */
function bindModuleMethod (method, moduleInstance, shouldSendData) {
    return function (url, args, config) {
        return new Promise((resolve, reject) => {
            config = { ...config, url, method };
            if (args) {
                if (shouldSendData) {
                    config.data = args;
                } else {
                    config.url = `${config.url}?${Qs.stringify(args, { arrayFormat: 'brackets' })}`;
                }
            }
            let request;
            if (this.request) {
                request = this.request;
            } else {
                request = this.$http.request;
            }
            return request.call(this, config)
                .then(response => resolve(response))
                .catch(error => reject(error))
        });
    }
}

/**
 * 根据定义的模块方法名称，通过methodPatternMapper转换成绑定URL的模块方法
 * */
function resolveMethodByName(moduleInstance, name) {
    let requestMethod = Object.keys(methodPatternMapper).filter(key => {
        let { pattern } = methodPatternMapper[key];
        if (!(pattern instanceof RegExp)) {
            pattern = new RegExp(pattern);
        }
        return pattern.test(name)
    });

    if (requestMethod.length !== 1) {
        throw new Error(`解析${name}异常, 解析方法只能有一个, 实际方法个数${requestMethod.length}`);
    }
    requestMethod = requestMethod[0];
    return bindModuleMethod(requestMethod, moduleInstance, methodPatternMapper[requestMethod].sendData);
}

export function bindUrls (urls) {
    return Module => {
        const keys = Object.keys(urls);
        if (!keys.length) {
            console.warn('urls对象为空, 无法完成URL的映射');
            return;
        }

        const instance = Module.prototype || Module;

        keys.forEach(name => {
            const url = urls[name];

            if (!url) {
                throw new Error(`${name}()的地址无效`);
            }

            // 根据urls对象动态定义模块方法
            Object.defineProperty(instance, name, {
                configurable: true,
                writable: true,
                enumerable: true,
                value: (function (url, func) {
                    return function () {
                        let innerUrl = url;
                        let args = Array.prototype.slice.call(arguments);
                        if (args.length > 0 && url.indexOf('/:') >= 0) {
                            if (isObject(args[0])) {
                                const params = args[0];
                                args = args.slice(1);
                                innerUrl = mapParamsToPathVariables(innerUrl, params);
                            }
                        }
                        return func && func.apply(this, [innerUrl].concat(args));
                    }
                })(url, resolveMethodByName(instance, name))
            });
        })
    }
}

