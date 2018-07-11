/**
 * 默认方法适配
 * @author Ouyang
*/
import {
    isString
} from 'lodash';

export const methodPatternMapper = {
    get: { pattern: '^(get|load|query|fetch)\\w+$' },
    post: { pattern: '^(create|new|post)\\w+$', sendData: true },
    put: { pattern: '^(update|sync|edit|modify|put)\\w+$', sendData: true },
    delete: { pattern: '^(delete|remove)\\w+$' }
};

export function mapParamsToPathVariables (url, params) {
    if (!url || isString(url)) {
        throw new Error(`url ${url} 必须是字符串类型`);
    }
    return url.replace(/:(\w+)/ig, (_, key) => params[key]);
}
