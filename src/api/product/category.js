import request from '@/utils/request'
const api_name = '/admin/product'
export default {
  getCategory1 () {
    return request({
      url: `${api_name}/getCategory1`,
      method:'GET'
    })
  },
  getCategory2 (category1Id) {
    return request({
      url: `${api_name}/getCategory2/${category1Id}`,
      method:'GET'
    })
  },
  getCategory3 (category2Id) {
    return request({
      url: `${api_name}/getCategory3/${category2Id}`,
      method:'GET'
    })
  },
}