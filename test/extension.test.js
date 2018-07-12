/**
 * 拓展功能测试
 * @author Ouyang
 * @version 1.0
*/

import CMSApi from '../src/example/cmsApi';

describe(`extension function`, () => {
    test(`http request`, () => {
        // console.log('cmsApi 1:', CMSApi);
        return CMSApi.getCoursewareList({}, {
            transformResponse: [(data) => {
                console.log('data:', data);
                if (typeof data === 'string') {
                    try {
                        data = JSON.parse(data);
                    } catch (e) { /* Ignore */ }
                }
                return data;
            }]
        }).then(res => {
            console.log('res:', res);
        }).catch(e => console.log('e:', e))
    })
})
