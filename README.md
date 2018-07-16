# http 请求封装库

基于Axios 封装的http请求库

## 安装

```
npm i @oys/http-module or npm i --save @oys/http-module
```

## 使用方法
```
import { createHttp } from '@oys/http-module';

// create http-module instance
const $http = createHttp(httpConfig);

// get method
$http.get(url, config).then(res => res).catch(e => e);

// post method
$http.post(url, data, config).then(res => res).catch(e => e);

// put method
$http.put(url, data, config).then(res => res).catch(e => e);

// delete method
$http.delete(url, config).then(res => res).catch(e => e);

// request method
$http.request(config).then(res => res).catch(e => e);

```

## httpConfig 说明
```
{
  // `url` 是用于请求服务器的地址, 即可以是相对地址, 需要配合baseURL。也可以是绝对地址
  url: '/user',

  // `method` 是 请求使用的方法类型, 常用的get, post, put, delete, 默认get
  method: 'get', // default

  // `baseURL` 如果url不是绝对地址, 那么baseURL会和url进行拼接。
  // 可以设置baseURL来传递相对的url
  // 例如: baseURL: 'https://some-domain.com/api/', url: '/list/{id}/resource'
  // http-module 请求的url地址为: https://some-domain.com/api/list/{id}/resource
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` 允许每次将数据发送至服务器前对数据进行修改
  // 它只适用 put, post, patch 请求方法
  // 数组中的最后一个方法必须返回一个字符串或者一个Buffer, ArrayBuffer的实例
  transformRequest: [function (data, headers) {
    // Do whatever you want to transform the data

    return data;
  }],

  // `transformResponse` 允许在请求响应后, 对响应的数据进行修改
  transformResponse: [function (data) {
    // Do whatever you want to transform the data

    return data;
  }],

  // `headers` 是要发送的自定义headers
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 是要发送请求的URL参数
  // 它应该是一个Plain Object 或者 一个 URLSearchParams Object
  params: {
    ID: 12345
  },

  // `paramsSerializer` 是一个可选的函数, 它是负责序列化 `params` 参数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` 是作为请求主体时发送的数据对象
  // 只适用于 put, post, patch 请求方法
  // 当没有设置 `transformRequest`时, data必须是以下类型:
  // - string, Plain Object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器环境允许: FormData, File, Blob
  // - Node环境允许: Stream, Buffer
  data: {
    firstName: 'Fred'
  },

  // `timeout` 指定了请求超时前的毫秒。
  // 如果这个请求超过了指定时间，它会被终止
  timeout: 1000,

  // `withCredentials` 是跨站点访问控制的请求开关
  withCredentials: false, // default

  // `adatper` 允许自定义处理请求
  // 返回一个 Promise 或者 一个有效的 Response (see lib/adapters/README.md)
  adapter: function (config) {
    /* ... */
  },

  // `auth` 表示应该使用Http Baseic auth, 并提供证书
  // 它会设置 `Authorization` header 覆盖原来存在的
  // `Authorization` 使用了自定义 headers 你应该使用 `headers`参数。
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // `responseType` 表示服务器响应的数据类型
  // 选项有: arraybuffer, blob, document, json, text, stream
  responseType: 'json', // default

  // `responseEncoding` 表示用于Response 解码类型
  // 注意: 它会忽略 stream 类型的responseType 的客户端请求
  responseEncoding: 'utf8', // default

  // `xsrfCookieName` 是用于作为xsrf token值的名称
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` 是http header中携带xsrf token值的名字
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

  // `onUploadProgress` 是处理上传进度事件的监听回调
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `onDownloadProgress` 是 处理下载进度事件的监听回调
  onDownloadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `maxContentLength` 定义http response 内容大小（单位字节）
  maxContentLength: 2000,

  // `validateStatus` 定义Http Response状态码是属于`Promise.resolve`或`Promise.reject`。
  // 如果 `validateStatus` 返回 true(或者是`null`或`undefined`), Promise将会执行resolved,
  // 否则 Promise将执行rejected
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // `maxRedirects` 定义在Node.js环境中最大重定向数量
  // 如果设置0, 将不会重定向
  maxRedirects: 5, // default

  // `socketPath` 在Node.js环境中定义一个UNIX Socket。
  // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
  // 只能指定 `socketPath` 或 `proxy`。
  // 如果2个都指定, 则`socketPath`优先被使用。
  socketPath: null, // default

  // `httpAgent`和`httpsAgent` 在Node.js环境定义一个自定义agent，被分别使用在执行http和https请求中
  // `keepAlive` 默认未启用-
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // `proxy` 定义代理服务的hounane和prot
  // 使用`false`可以禁用代理，忽略环境变量值
  // `auth` 表示应该使用Http Basic auth来连接代理，并且提供证书
  // 它会设置一个 `Proxy-Authorization` header，覆盖原有的存在
  // `Proxy-Authorization` 是自定义headers你应该设置`headers`参数
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` 指定一个取消token，它可以用来取消request
  // (有关详情，请看取消reqeust部分)
  cancelToken: new CancelToken(function (cancel) {
  })
}
```

## Response 模型
```
{
  // `data` 是服务器提供的Response数据
  data: {},

  // `status` 是来自服务器Response的HTTP的状态码
  status: 200,

  // `statusText` 是来自服务器Response的Http状态码信息
  statusText: 'OK',

  // `headers` 是服务器Response的heade信息集合
  // 所有 header 名字都是小写 
  headers: {},

  // `config` 是由reqeust提供给`axios`的配置
  config: {},

  // `reqeust` 是创建该Response的reqeust
  // 在Node.js环境中, 它是一个last ClientRequest实例
  // 在Browser环境中, 它是一个XMLHttpRequest实例
  request: {}
}
```

## 拦截器
用户可以在reqeusth或response前拦截它们, 并做所需的业务处理
```
// 添加 response 拦截
$http.addResponseInterceptor(function onSuccess (response) {
    return response;
}, function onFailre (error){
    return Promise.reject(error)l
})

// 添加 request 拦截
$http.addRequestInterceptor(function onSuccess (config) {
    return config;
}, function onError (error) {
    return Promise.reject(error)
})
```

## 快速开发
```
git clone git@github.com:ouyangshan09/httpModule.git 

or

git clone https://github.com/ouyangshan09/httpModule.git

npm i
```

#### 1、项目安装
- 执行 `npm install` 命令

#### 2、开发时调试
- 执行 `npm start` 命令

#### 3、测试
- 执行 `npm run test` 命令

#### 4、项目构建
- 执行 `npm run build` 命令

#### 5、清理 dist 文件夹
- 执行 `npm run clean` 命令

#### 6、预编译vendors库
- 执行 `npm run dll` 命令

## 项目介绍

### 目录结构

```
react                   react项目根目录
  ├─config              配置目录
  ├─dist                生产目录
  ├─lib                 第三方依赖库
  ├─node_modules
  ├─scripts             执行脚本目录
  ├─src                 开发目录
  ├─plugin              插件目录
  ├─.babelrc            babel配置文件
  ├─.eslintignore       eslint忽略配置文件
  ├─.eslintrc.js        eslint配置文件
  ├─.gitignore          文件忽略配置
  ├─.gitlab-ci.yml      gitlab持续集成配置
  ├─.npmrc              npm配置
  ├─.stylelintignore    stylelint忽略配置
  ├─.stylelintrc        stylelint配置
  ├─CHANGELOG           版本变更日志
  ├─CONTRIBUTING.md
  ├─package.json
  ├─postcss.config.js   postcss配置文件
  ├─README.md
```
