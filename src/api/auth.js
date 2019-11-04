import request from '@/utils/request'

export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: process.env.VUE_APP_API + '/user-info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: process.env.VUE_APP_API + '/logout',
    method: 'get'
  })
}

export function forgotPassword(data) {
  return request({
    url: process.env.VUE_APP_API + '/forgot-password',
    method: 'post',
    data
  })
}

export function resetPassword(token, data) {
  return request({
    url: process.env.VUE_APP_API + '/reset-password/' + token,
    method: 'post',
    data
  })
}
