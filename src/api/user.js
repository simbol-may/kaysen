import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/weixinMCL/login',
    // url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo (token) {
  console.log(token, 'token')
  return request({
    url: '/vue-admin-template/user/info',
    // url: '/admin/acl/index/info',
    method: 'get',
    params: { token }
  })
}

export function logout () {
  return request({
    url: '/admin/acl/index/logout',
    method: 'post'
  })
}
