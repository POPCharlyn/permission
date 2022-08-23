import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 请求拦截器主要处理 token的统一注入问题
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if ( store.getters.token ) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers[ 'X-Token' ] = getToken();
    }
    return config;
  },
  error => {
    // do something with request error
    console.log( error ); // for debug
    return Promise.reject( error );
  }
);

// 响应拦截器主要处理返回的数据异常和数据结构问题
// response interceptor
service.interceptors.response.use(
  response => {
    if (response.data.code === 0) {
      // 服务端定义的响应code码为0时请求成功
      // 使用Promise.resolve 正常响应
      return Promise.resolve(response.data)
    } else {
      // 使用Promise.reject 响应
      Message.error(response.data.message)
      return Promise.reject(response.data)
    }
  },
  error => {
    console.log( 'err from: ' + error ); // for debug
    let message = '';
    if ( error && error.response ) {
      switch ( error.response.status ) {
        case 401:
          location.reload();
          return;
        case 403:
          message = error.response.data.path + ',' + error.response.data.message;
          break;
        case 404:
          message = '无效访问!';
          break;
        default:
          message = error.response.data.message ? error.response.data.message : '服务器错误';
          break;
      }
      Message.error( message );
      // 请求错误处理
      return Promise.reject( error );
    }
    else {
      message = '连接服务器失败';
      Message.error( message );
      return Promise.reject( error );
    }
  }
);

export default service
