/**
 * 拓展功能测试
 * @author Ouyang
 * @version 1.0
*/

import CMSApi from '../src/example/cmsApi';

describe(`extension function`, () => {
    test(`http request`, () => {
        return CMSApi.getCoursewareList({}).then(res => {
            console.log('res:', res);
        }).catch(e => console.log('e:', e))
    })

    test(`bindUrl:`, () => {
        // console.log('bind:', bind);
    })
})
