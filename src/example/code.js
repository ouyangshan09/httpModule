/**
 * Response Code 处理配置
 * @author Ouyang
 * @version 1.0
*/
import {
    isUndefined,
    forEach
} from 'lodash';

export function createCodeCofig (config = {}) {
    forEach(config, item => {
        if (isUndefined(item.validate)) {
            item.validate = true;
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
    0: (data) => {
        return {
            data
        }
    },
    703: (data) => {
        return {
            data,
            validate: false
        }
    }
})
