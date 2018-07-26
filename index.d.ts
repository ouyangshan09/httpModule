/**
 * 关于@osy/http-module d.ts模块接口说明
 * @author Ouyang
*/
import {
    AxiosPromise,
    AxiosRequestConfig,
    CancelTokenStatic,
    CancelTokenSource,
    CancelToken,
    Cancel,
    
} from 'axios';

export declare function bindUrls<T>(urls: object): T;

export interface ResponseHandle<T = any> {
    data: T;
    validate: boolean;
}

export interface HeaderConfig {
    common?: any;
    get?: any;
    post?: any;
    put?: any;
    delete?: any;
    request?: any;
}

export interface HttpModule {
    (config?: AxiosRequestConfig = {}): HttpModuleInstance;
    (url: string, config?: AxiosRequestConfig = {}): HttpModuleInstance;

    static CancelToken: CancelToken;

    static createCancelToken(): CancelTokenSource;

    static create(config?: AxiosRequestConfig = {}): HttpModuleInstance;
}

export interface HttpModuleInstance {
    get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
    delete(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    request<T = any>(config?: AxiosRequestConfig): AxiosPromise<T>;
    addRequestInterceptor(onResolve: Function, onRejected: Function): number;
    removeRequestInterceptor(id: number): void;
    addResponseInterceptor(onResolve: Function, onRejected: Function): number;
    removeResponseInterceptor(id: number): void;
    cancelAll(): void;
    Cancel: Cancel;
    CancelToken: CancelToken;
    isCancel: boolean;
    create: (config?: AxiosRequestConfig) => HttpModuleInstance;
}

declare const HttpInstance: HttpModuleInstance;
declare const Http: HttpModule;

export default HttpInstance;
export {
    Http
}


export abstract class BaseHttp {
    static resolveHeaderConfig(method: string, headers: HeaderConfig): any;

    private $http: HttpModuleInstance;
    private defaultMehotdHeaders: object;

    constructor () {}

    abstract getBaseURL(): string;
    abstract getResponseHandle<T = any>(): ResponseHandle<T> | object;
    get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
}

// export interface HttpModalStatic extends HttpModuleInstance {
//     create(config?: AxiosRequestConfig): HttpModuleInstance;
//     CancelToken: CancelTokenStatic;
//     createCancelToken(): CancelTokenSource;
//     isCancel(...args: Array<any>): boolean;
// }

// declare const HttpModule: HttpModuleInstance;

// export default HttpModule;


// export interface ResponseHandle<T = any> {
//     data: T;
//     validate: boolean;
// }

// export interface HeaderConfig {
//     common?: any;
//     get?: any;
//     post?: any;
//     put?: any;
//     delete?: any;
//     request?: any;
// }

// export interface BaseHttpInsantce {
//     (...args?: Array<any>): BaseHttpInsantce;
//     getBaseURL(): string;
//     getResponseHandle<T = any>(): ResponseHandle<T> | object;
//     get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
//     post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
//     put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
//     delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
//     request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
// }

// export interface AbstracBaseHttp extends BaseHttpInsantce {
//     resolveHeaderConfig(method: string, headers: HeaderConfig): any;
// }

// declare const BaseHttp: AbstracBaseHttp;

// export {
//     BaseHttp
// }

// export declare function bindUrls<T> (urls: object): T;
