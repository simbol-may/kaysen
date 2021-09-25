<template>
  <el-form
    :model="dataForm"
    ref="dataForm"
    :rules="rules"
    style="padding-top: 40px"
    label-width="140px"
    class="demo-ruleForm"
    size="small"
  >
    <el-row>
      <el-col :span="8">
        <el-form-item label="公司名称:" prop="companyName">
          <el-input
            disabled
            v-model="dataForm.companyName"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="联系人姓名:" prop="companyUserName">
          <el-input v-model="dataForm.companyUserName" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="手机号码:" prop="companyUserCode">
          <el-input v-model="dataForm.companyUserCode" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="状态:" prop="userState">
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
        <el-form-item label="角色:" prop="roleCode">
          <!-- <el-input v-model="dataForm.roleName" clearable></el-input> -->
          <el-select
            style="width: 100%"
            disabled
            v-model="dataForm.roleCode"
            clearable
          >
            <el-option
              v-for="item in roletypes"
              :key="item.code"
              :checked="item.checked"
              :label="item.codeName"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24" style="text-align: right">
        <el-button type="primary" @click="submitForm('dataForm')"
          >新增</el-button
        >
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'addUser',
  data() {
    var validate1 = (rule, value, callback) => {
      if (!value || value.trim() === '') {
        return callback(new Error('公司名称不能为空'))
      } else {
        callback()
      }
    }
    var validate2 = (rule, value, callback) => {
      if (!value || value.trim() === '') {
        callback(new Error('联系人姓名不能为空'))
      } else {
        callback()
      }
    }
    var validate3 = (rule, value, callback) => {
      if (!value || value.trim() === '') {
        callback(new Error('手机号码不能为空'))
      } else {
        callback()
      }
    }
    var validate4 = (rule, value, callback) => {
      if (!value || value.trim() === '') {
        callback(new Error('状态不能为空'))
      } else {
        callback()
      }
    }
    var validate5 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('角色不能为空'))
      } else {
        callback()
      }
    }
    return {
      dataForm: {
        roleCode: '002',
      },
      userStates: [],
      roletypes: [],
      rules: {
        companyName: [{ validator: validate1, trigger: 'blur' }],
        companyUserName: [{ validator: validate2, trigger: 'blur' }],
        companyUserCode: [{ validator: validate3, trigger: 'blur' }],
        userState: [{ validator: validate4, trigger: 'blur' }],
        roleCode: [{ validator: validate5, trigger: 'blur' }],
      },
    }
  },
  computed: {
    ...mapGetters(['userCode']),
  },
  mounted() {
    this.getState()
    this.getRole()
    console.log(this.$route, '1111')
    const { companyCode, companyName } = this.$route.query.company
    this.$set(this.dataForm, 'companyCode', companyCode)
    this.$set(this.dataForm, 'companyName', companyName)
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addUser()
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
        userCode: this.userCode,
        companyUserCode,
        companyUserName,
        userCode: this.userCode,
        userState,
        roleCode,
      })
      if (result.code === 200) {
        this.$message.success(result.msg)
      } else {
        this.$message.success('请输入完整的用户信息')
      }
    },
  },
}
</script>

<style>
</style>