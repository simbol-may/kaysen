import request from '@/utils/request'
const api_name = `/weixinMLC`
export default {
  // 获取白名单数据
  getList (data) {
    return request.post(`${api_name}/white/queryWhiteList`, data)
  },
  // 白名单新增
  addUser (user) {
    return request.post(`${api_name}/white/addWhiteUser`, user)
  },
  // 浏览记录
  getOperateRecord (data) {
    return request.post(`${api_name}/white/queryOperaterRecord`, data)
  },
  // 更改状态
  changeState (data) {
    return request.post(`${api_name}/white/updUserState`, data)
  },
  // 下拉框数据
  getSelect (selectType) {
    return request.post(`${api_name}/select/getSelectValue`, selectType)
  }
} 
