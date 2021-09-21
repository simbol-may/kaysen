import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/weixinMLC/login',
    // url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}
// 重置密码
export function resetPassword (data) {
  return request({
    url: '/weixinMLC/userManage/updateUserByCondition',
    // url: '/admin/acl/index/info',
    method: 'post',
    data
  })
}

export function logout () {
  return request({
    url: '/weixinMLC/logout',
    method: 'post'
  })
}
