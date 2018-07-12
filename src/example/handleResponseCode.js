/**
 * 处理响应码
*/
import CODE_CONFIG  from './code';

export default function handleResponseCode ({code, data, ...args}) {
    const codeCofig = CODE_CONFIG[code];
    if (codeCofig) {
        let result = codeCofig.serialized && codeCofig.serialized(data);
        let validate = codeCofig.validate;
        return {
            data: result,
            validate: validate
        }
    }
    return { validate: false }   
}
