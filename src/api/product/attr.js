import request from '@/utils/request'
const api_name = '/admin/product'
export default {
  getAttrList (category1Id,category2Id,category3Id) {
    return request.get(`${api_name}/attrInfoList/${category1Id}/${category2Id}/${category3Id}`)
  },
  deleteAttrById () {
    return request.delete(`${api_name}/deleteAttr/{attrId}`)
  },
  getAttrValueList () {
    return request.get(`${api_name}/getAttrValueList/{attrId}`)
  },
  saveAttrInfo () {
    return request.post(`${api_name}/saveAttrInfo`)
  },
}