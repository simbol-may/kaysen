import request from '@/utils/request'
const api_name = '/admin/product/baseTrademark'
export default {
  getTrademarkByKeyword (keyword) {
    return request.get(`${api_name}/findBaseTrademarkByKeyword/${keyword}`)
  },
  getTrademarkById (id) {
    return request.get(`${api_name}/get/${id}`)
  },
  getTrademarkList (page, limit) {
    if (page && limit) {
      return request.get(`${api_name}/${page}/${limit}`)
    } else {
      return request.get(`${api_name}/getTrademarkList`)
    }
  },
  findBaseTrademarkByTrademarkIdList (trademark) {
    return request.post(`${api_name}/inner/findBaseTrademarkByTrademarkIdList`,trademark)
  },
  deleteTrademark (id) {
    return request.delete(`${api_name}/remove/${id}`)
  },
  addOrUpdateTrademark (trademark) {
    if (trademark.id) {
      return request.put(`${api_name}/update`, trademark)
    } else {
      return request.post(`${api_name}/save`, trademark)
    }
  },
}


// /admin/product/baseTrademark/findBaseTrademarkByKeyword/{keyword}
// findBaseTrademarkByKeyword

// GET /admin/product/baseTrademark/get/{id}
// 获取BaseTrademark

// GET /admin/product/baseTrademark/getTrademarkList
// getTrademarkList

// POST /admin/product/baseTrademark/inner/findBaseTrademarkByTrademarkIdList
// findBaseTrademarkByTrademarkIdList

// DELETE /admin/product/baseTrademark/remove/{id}
// 删除BaseTrademark

// POST /admin/product/baseTrademark/save
// 新增BaseTrademark

// PUT /admin/product/baseTrademark/update
// 修改BaseTrademark

// GET /admin/product/baseTrademark/{page}/{limit}