/**
 * 关于@osy/http-module d.ts模块接口说明
 * @author Ouyang
*/
import {
    AxiosPromise,
    AxiosRequestConfig,
    CancelTokenStatic,
    CancelTokenSource
} from 'axios';

// export interface createHttp {

// }

export interface HttpModuleInstance {
    (config: AxiosRequestConfig): HttpModuleInstance;
    (url: string, config?: AxiosRequestConfig): HttpModuleInstance;
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

export interface HttpModalStatic extends HttpModuleInstance {
    CancelToken: CancelTokenStatic;
    getCancelMethod(): CancelTokenSource;
    isCancel(...args: Array<any>): boolean;
}

export function createHttp (config: AxiosRequestConfig): HttpModuleInstance {}

declare const HttpModule: HttpModalStatic;

export default HttpModule;
