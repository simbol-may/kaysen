<template>
  <el-form inline>
    <el-form-item label="一级分类">
      <el-select
        v-model="category1Id"
        placeholder="请选择"
        @change="getCategory2List"
      >
        <el-option
          :label="c1.name"
          :value="c1.id"
          v-for="(c1, index) in category1List"
          :key="c1.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select
        v-model="category2Id"
        placeholder="请选择"
        @change="getCategory3List"
      >
        <el-option
          :label="c2.name"
          :value="c2.id"
          v-for="(c2, index) in category2List"
          :key="c2.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
      <el-select
        v-model="category3Id"
        placeholder="请选择"
        @change="changeCategory3"
      >
        <el-option
          :label="c3.name"
          :value="c3.id"
          v-for="(c3, index) in category3List"
          :key="c3.id"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'categorySelector',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      category1List: [],
      category2List: [],
      category3List: [],
    }
  },
  mounted() {
    this.getCategory1List()
  },
  methods: {
    async getCategory1List() {
      const result = await this.$API.category.getCategory1()
      if (result.code === 200) {
        this.category1List = result.data
      }
    },
    async getCategory2List(categoryId) {
      this.category2Id = ''
      this.category3Id = ''
      this.category2List = []
      this.category3List = []
      this.$emit('changeCategory', { categoryId, level: 1 })
      const result = await this.$API.category.getCategory2(categoryId)
      if (result.code === 200) {
        this.category2List = result.data
      }
    },
    async getCategory3List(categoryId) {
      this.category3Id = ''
      this.category3List = []
      this.$emit('changeCategory', { categoryId, level: 2 })
      const result = await this.$API.category.getCategory3(categoryId)
      if (result.code === 200) {
        this.category3List = result.data
      }
    },
    changeCategory3(categoryId) {
      this.$emit('changeCategory', { categoryId, level: 3 })
    },
  },
}
</script>

<style>
</style>