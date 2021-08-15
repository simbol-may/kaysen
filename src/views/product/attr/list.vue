<template>
  <div>
    <el-card>
      <categorySelector @changeCategory="changeCategory" />
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AttrList',
  data(){
    return{
      category1Id: '',
      category2Id: '',
      category3Id: '',
    }
  },
  methods:{
    changeCategory({categoryId,level}){
      if(level===1){
        this.category1Id = categoryId
        this.category2Id = ''
        this.category3Id = ''
      }else if(level===2){
        this.category2Id = categoryId
        this.category3Id = ''
      }else if(level===3){
        this.category3Id = categoryId
        this.getAttrList()
        
      }
    },
    async getAttrList(){
      const {category1Id,category2Id,category3Id} = this
      console.log(category1Id,category2Id,category3Id);
      
      const result = await this.$API.attr.getAttrList(category1Id,category2Id,category3Id)
      console.log(result,'111');
      
      if(result.code===200){

      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
