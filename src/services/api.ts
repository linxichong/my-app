import axios from 'axios';

export class BaseApi {
    // 默认配置
    static base_options() {
        return {
            // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
            // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
            baseURL: 'http://localhost:8090/api/',
            // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
            // 如果请求话费了超过 `timeout` 的时间，请求将被中断
            timeout: 1000,
            // `responseType` 表示服务器响应的数据类型
            responseType: 'json',
            // `maxContentLength` 定义允许的响应内容的最大尺寸
            maxContentLength: 2000,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
        }
    }

    /**
     * 通用Http请求处理
     */
    static common = (name: string, url: string, config?: any) => {
        let opts = { ...BaseApi.base_options(), ...config, url: url, method: name }
        return axios(opts).then((res) => {
            if (res.status === 200) {
                return res.data
            }
        }).catch(error => {
            console.log(error)
            return error;
        })
    }
    // get 请求
    static get = (url: string, params?: {}) => {
        return BaseApi.common('get', url, { params: params })
    }
    // post 请求
    static post = (url: string, params?: {}) => {
        return BaseApi.common('post', url, { params: params })
    }
}