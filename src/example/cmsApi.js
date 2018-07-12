/**
 * 备课系统Api接口
 * @author Ouyang
 * @version 1.0
*/
import BaseHttp from './baseHttp';
import { BindURL } from '../http';
import handleResponseCode from './handleResponseCode';

@BindURL({
    /**
     * 获取用户课件列表
     * query: { page, pageSize, folderId, keyword }
     * */
    getCoursewareList: '/api/user/coursewares'
})
class CMSApi extends BaseHttp {
    constructor () {
        super();
    }

    getBaseURL () {
        return 'https://dev-cjcms-api.ecaicn.com';
    }

    getResponseHandle (data) {
        return handleResponseCode(data);
    }
}

export default new CMSApi();
