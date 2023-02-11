const localurl = "https://www.sourcandy.cn/smail/"
module.exports = {
  ApiBanner:localurl + "mini/banner",//banner栏
}

/**
 * http 请求封装
 */
interface HttpRequest {
    api: string,
    param: any,
    needToken?: boolean,
    method: HttpMethod
}
/**
 * http请求方法枚举
 */
export enum HttpMethod {
    GET,
    POST
}

/**
 * http请求拦截器
 */
interface HttpInterceptor {
    handleResponse(statusCode: number, data: string | IAnyObject | ArrayBuffer, callback: HttpCallback)
}

/**
 * http请求回调
 */
interface HttpCallback {
    /**
     * 请求成功
     */
    onSuccess: SuccessCallback
    onServerError: ErrorCallback
    onNetworkError: ErrorCallback
}

/**
 * 请求错误
 */
interface HttpError {
    code: number,
    msg: string
}

/**
 * 成功的callback
 */
type SuccessCallback = (data: string | IAnyObject | ArrayBuffer) => void;

/**
 * 错误的callback
 */
type ErrorCallback = (error: HttpError) => void;

/**
 * 默认的网络拦截器
 */
class DefaultHttpInterceptor implements HttpInterceptor {
    private readonly CODE_SUCCESS: number = 200;

    public constructor() {

    }

    handleResponse(statusCode: number, data: string | IAnyObject | ArrayBuffer, callback: HttpCallback) {

        let error: ServerError;
        if (statusCode == this.CODE_SUCCESS) {
            callback.onSuccess(data)
            return
        }

        error = new ServerError(statusCode, data, callback.onServerError)
        error.processError();
    }
}

export class DefaultCallback implements HttpCallback {
    onSuccess: SuccessCallback
    onServerError: ErrorCallback
    onNetworkError: ErrorCallback

    constructor(success: SuccessCallback, serverError?: ErrorCallback, networkError?: ErrorCallback) {
        this.onSuccess = success

        if (serverError) {
            this.onServerError = serverError
        } else {
            this.onServerError = (error) => {
                console.log(error.msg)
            }
        }

        if (networkError) {
            this.onNetworkError = networkError
        } else {
            this.onNetworkError = (error) => {
                console.log(error.msg)
            }
        }
    }
}
/**
 * 服务器返回错误，如401,500等
 */
class ServerError implements HttpError {

    private readonly ERROR_CODE_UNAUTH: number = 401;
    private readonly ERROR_CODE_SERVER_ERROR_BASE = 500;

    code: number
    msg: string
    callback: ErrorCallback
    constructor(code, msg, callback) {
        this.code = code;
        this.msg = msg;
        this.callback = callback
    }

    /**
     * 网络请求错误处理
     * @param callback 
     */
    processError() {
        console.error('get error on http request, error code: ' + this.code + ', error message: ' + this.msg)

        if (this.code == this.ERROR_CODE_UNAUTH) {
            this.processUnauthError()
        } else if (this.code >= this.ERROR_CODE_SERVER_ERROR_BASE) {
            this.processServerError()
        } else {
            this.processUnknownError()
        }
    }

    /**
     * 处理未认证错误
     */
    processUnauthError() {

    }

    /**
     * 处理服务器返回错误
     */
    processServerError() {

    }

    /**
     * 处理未知错误
     */
    processUnknownError() {

    }
}
/**
 * 网络请求客户端
 */
class HttpClient {
    private static readonly host: string = 'https://www.jianshu.com/'
    private static instance: HttpClient;
    private m_Interceptor: HttpInterceptor;
    private constructor() {
        this.m_Interceptor = new DefaultHttpInterceptor();
    }

    /**
     * 单例
     */
    public static getInstance(): HttpClient {
        if (!this.instance) {
            this.instance = new HttpClient();
        }

        return this.instance;
    }

    /**
     * 网络请求方法
     * @param request 网络请求元素
     * @param callback 请求回调
     * @param interceptor 自定义拦截器
     */
    public request(request: HttpRequest, callback: DefaultCallback, interceptor?: HttpInterceptor) {
        wx.request({
            url: this.buildUrl(request.api),
            data: request.param,
            method: request.method == HttpMethod.GET ? "GET" : "POST",
            header: this.buildHeader(request.method, request.needToken),
            success: (result) => {
                // callback.onSuccess(result.data)
                if (interceptor) {
                    interceptor.handleResponse(result.statusCode, result.data, callback)
                } else {
                    this.m_Interceptor.handleResponse(result.statusCode, result.data, callback)
                }
            },
            fail: (reason) => {
                if (callback.onNetworkError) {
                    callback.onNetworkError(new NetworkError(0, reason.errMsg));
                }
            }
        })
    }

    /**
     * 构建header
     * @param method
     * @param needToken
     */
    private buildHeader(method: HttpMethod, needToken = false): IAnyObject {
        let contentType: string;
        if (method == HttpMethod.GET) {
            contentType = ''
        } else {
            contentType = ''
        }

        return {
            contentType: contentType,
            token: needToken ? 'token' : ''
        }
    }

    /**
     * 构建url
     * @param api 
     */
    private buildUrl(api: string): string {
        return HttpClient.host + api;
    }
}

export const ApiClient = HttpClient.getInstance();