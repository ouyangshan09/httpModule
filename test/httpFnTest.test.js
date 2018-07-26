/**
 * Http 功能模块测试
 * @author Ouyang
*/

import HttpInstance, { Http } from '../src/http';

describe(`Http Instance fn`, () => {
    test(`http cancelToken`, () => {
        return HttpInstance.get(`https://dev-cjcms-api.ecaicn.com/api/user/coursewares`, {
            params: {
                page: 2,
                pageSize: 10
            },
            cancelToken: new Http.CancelToken(function executor (c) {
                console.log('cancel:', c);
            })
        }).then(res => console.log('res:')).catch(e => e)
    })

    test(`http create:`, () => {
        console.log('instance:', HttpInstance.create);
        const isntance = HttpInstance.create({});
        console.log('instance:', isntance);
    })
})
