/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable compat/compat */
import axios from "axios";
import qs from "qs";

axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.resolve(error);
  }
);

const errorHandle = (status, other) => {
  // リスポンスのステータスコード判断
  switch (status) {
    // 401
    case 401:
      console.log("401", other);
      break;
    // 403
    case 403:
      console.log("403", other);
      break;
    // 404
    case 404:
      console.log("403", other);
      break;
    default:
      console.log(other);
  }
};

axios.interceptors.response.use(
  // リクエスト成功の場合
  res => (res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res)),
  error => {
    const { response } = error;
    if (response) {
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      return Promise.reject(error);
    }
  }
);

export default class AxiosApi {
  static baseOptions() {
    return {
      baseURL: "/api"
      // timeout: 1000
    };
  }

  static common = (name: string, url: string, config?: any) => {
    const opts = {
      ...AxiosApi.baseOptions(),
      ...config,
      url: url,
      method: name
    };
    return axios(opts);
  };
  // get
  static get = (url: string, params?: {}) => {
    return AxiosApi.common("get", url, { params: params });
  };
  // post
  static post = (url: string, params?: {}) => {
    const headers = { "content-type": "application/x-www-form-urlencoded" };
    const data = qs.stringify(params);
    return AxiosApi.common("post", url, { headers, data });
  };
}
