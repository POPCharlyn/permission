import request from '@/utils/request'
import {getToken} from '@/utils/auth'

/**
 * 用户登录
 * @param userName
 * @param password
 */
export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export const logout = () => {
  return request({
    url: '/user/out',
    method: 'post',
    data: { token: getToken() }
  })
}
