/**
 * Response Code 处理配置
 * @author Ouyang
 * @version 1.0
*/
import {
    isUndefined,
    forEach
} from 'lodash';

const defaultSerialized = (data) => data;

export function createCodeCofig (config = {}) {
    forEach(config, item => {
        if (isUndefined(item.validate)) {
            item.validate = true;
        }
        if (isUndefined(item.serialized)) {
            item.serialized = defaultSerialized;
        }
        if (isUndefined(item.message)) {
            item.message = '';
        }
    })
    return config;
}

/**
 * 创建Response Code 配置
 * 函数返回结果必须是以下结构
 * {
 *  data: object,
 *  validate: boolean - option(默认为true)
 * }
*/
export default createCodeCofig({
    0: {
        // option - 默认返回responseData
        // serialized: data => data,
        // option - 
        // message: '',
        // option - 默认为true
        // validate: true
    },
    703: {
        validate: false
    }
});

export function handleResponseCode ({code, data, ...args}) {
    const codeCofig = {};
    if (codeCofig) {
        let result = codeCofig.serialized && codeCofig.serialized(data);
        let validate = codeCofig.validate;
        return {
            data: result,
            validate: validate
        }
    }
    return { validate: false }
    return {};
}
