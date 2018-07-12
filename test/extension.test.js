/**
 * 拓展功能测试
 * @author Ouyang
 * @version 1.0
*/

import CMSApi from '../src/example/cmsApi';
import CMSApi2 from '../src/example/cmsApi2';

describe(`extension function`, () => {
    test(`http request`, () => {
        return CMSApi.getCoursewareList({}).then(res => {
            console.log('res:', res);
        }).catch(e => console.log('e:', e))
    })

    test(`bindUrl:`, () => {
        return CMSApi2.getCoursewareList().then(res => {
            console.log('res2:', res);
        }).catch(e => console.log('e2:', e))
    })
})
