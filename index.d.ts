/**
 * 关于@osy/http-module d.ts模块接口说明
 * @author Ouyang
*/
import {
    AxiosPromise,
    AxiosRequestConfig,
    CancelTokenStatic,
    CancelTokenSource,
} from 'axios';

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

export declare class HttpModule {
    
    constructor(config?: AxiosRequestConfig = {});

    static CancelToken: CancelToken;

    static createCancelToken(): CancelTokenSource;

    static create(): HttpModalConstructor;
    
}

interface HttpModalConstructor {
    new (config: AxiosRequestConfig): HttpModuleInstance;
    new(url: string, config?: AxiosRequestConfig): HttpModuleInstance;
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
}

export declare class BaseHttp {
    constructor(...args: Array<T>);

    static resolveHeaderConfig(method: string, headers: HeaderConfig): any;
}

export interface BaseHttpInsantce {
    (...args?: Array<any>): BaseHttpInsantce;
    getBaseURL(): string;
    getResponseHandle<T = any>(): ResponseHandle<T> | object;
    get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
}

export declare function bindUrls<T> (urls: object): T;

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
