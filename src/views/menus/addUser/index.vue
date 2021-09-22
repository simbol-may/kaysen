<template>
  <el-form label-width="140px" size="small">
    <el-row>
      <el-col :span="8">
        <el-form-item label="公司名称:">
          <el-input v-model="dataForm.companyName" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="联系人姓名:">
          <el-input v-model="dataForm.companyUserName" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="手机号码:">
          <el-input v-model="dataForm.companyUserCode" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="状态:">
          <el-select style="width: 100%" v-model="dataForm.userState" clearable>
            <el-option
              v-for="item in userStates"
              :key="item.code"
              :label="item.codeName"
              :value="item.code"
            ></el-option>
          </el-select>
          <!-- <el-input v-model="dataForm.userState" clearable></el-input> -->
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="角色:">
          <!-- <el-input v-model="dataForm.roleName" clearable></el-input> -->
          <el-select style="width: 100%" v-model="dataForm.roleCode" clearable>
            <el-option
              v-for="item in roletypes"
              :key="item.code"
              :label="item.codeName"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24" style="text-align: right">
        <el-button type="primary" @click="addUser">新增</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: 'addUser',
  data() {
    return {
      dataForm: {},
      userStates: [],
      roletypes: [],
    }
  },
  mounted() {
    this.getState()
    this.getRole()
    console.log(this.$route, '1111')
    const { companyCode, companyName } = this.$route.query.company
    this.$set(this.dataForm, 'companyCode', companyCode)
    this.$set(this.dataForm, 'companyName', companyName)
    // this.dataForm.companyCode = companyCode
    // this.dataForm.companyName = companyName
  },
  methods: {
    async getState() {
      // getSelect
      const result = await this.$API.table.getSelect({
        selectType: 'userstate',
      })
      if (result.code === 200) {
        this.$set(this, 'userStates', result.dataInfo)
      }
    },
    async getRole() {
      // getSelect
      const result = await this.$API.table.getSelect({
        selectType: 'roletype',
      })
      if (result.code === 200) {
        this.$set(this, 'roletypes', result.dataInfo)
      }
    },
    async addUser() {
      const {
        companyCode,
        companyName,
        companyUserCode,
        companyUserName,
        userState,
        roleCode,
      } = this.dataForm
      const result = await this.$API.table.addUser({
        companyCode,
        companyName,
        companyUserCode,
        companyUserName,
        userCode: this.userCode,
        userState,
        roleCode,
      })
      if (result.code === 200) {
        this.$message.success(result.msg)
      } else {
        this.$message.success(result.msg)
      }
    },
  },
}
</script>

<style>
</style>