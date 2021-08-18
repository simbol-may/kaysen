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
    <h4></h4>
  </div>
</template>

<script>
export default {
  name: 'whiteList',
}
</script>

<style lang="scss" scoped>
</style>
