/**
 * 拓展功能测试
 * @author Ouyang
 * @version 1.0
*/

import CMSApi from '../src/example/cmsApi';
import { BindURL } from '../src/http';

describe(`extension function`, () => {
    test(`http request`, () => {
        console.log('cmsApi 1:', CMSApi);
        // const promise = CMSApi.getCoursewareList({});
        console.log('promise:', CMSApi.getCoursewareList);
        // return CMSApi.getCoursewareList({}).then(res => {
        //     // console.log('res:', res);
        // }).catch(e => console.log('e:', e))
    })

    test(`bindUrl:`, () => {
        // console.log('bind:', bind);
    })
})
