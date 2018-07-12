/**
 * 测试BindURL功能
*/
import { BindURL, createHttp } from '../http';

const http = createHttp({
    baseURL: 'https://dev-cjcms-api.ecaicn.com'
})

const CMSApi2 = BindURL({
    getCoursewareList: '/api/user/coursewares'
})(function () {
    this.$http = http;
});

export default new CMSApi2();
