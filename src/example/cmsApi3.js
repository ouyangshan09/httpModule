import { BaseHttp } from '../../index';

BaseHttp.resolveHeaderConfig('put', {
    get: {},
    post: {}
})

class CMSApi extends BaseHttp {
    constructor () {
        super();
    }

    getBaseURL () {
        //
    }
}
