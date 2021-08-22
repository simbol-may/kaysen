<template>
  <div>
    <h4>新增用户</h4>
    <el-form label-width="140px" size="small">
      <el-row>
        <el-col :span="8">
          <el-form-item label="公司名称:">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系人姓名:">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码:">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态:">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="角色:">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="text-align: right">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onSubmit">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <h4>查询结果</h4>
    <el-table :data="tableData1" height="250" border style="width: 100%">
      <el-table-column
        v-for="(item, index) in tabTagName1"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="width"
      >
      </el-table-column>
    </el-table>
    <h4>用户访问轨迹</h4>
    <el-table :data="tableData2" height="250" border style="width: 100%">
      <el-table-column
        v-for="(item, index) in tabTagName2"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="width"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'whiteList',
  data() {
    return {
      tabTagName1: [
        {
          prop: 'company',
          label: '公司名称',
        },
        {
          prop: 'company',
          label: '手机号码',
        },
        {
          prop: 'company',
          label: '用户姓名',
        },
        {
          prop: 'company',
          label: '状态',
        },
        {
          prop: 'company',
          label: '最后登录时间',
        },
        {
          prop: 'company',
          label: '角色',
        },
        {
          prop: 'company',
          label: '操作人员',
        },
      ],
      tabTagName2: [
        {
          prop: 'company',
          label: '访问页面',
        },
        {
          prop: 'company',
          label: '访问日期',
        },
      ],
      tableData1: [],
      tableData2: [],
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
