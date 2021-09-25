<template>
  <div style="width: 500px; padding-top: 40px">
    <el-form :model="form" :rules="rules" ref="form" label-width="180px">
      <el-form-item label="请输入旧密码:" prop="oldPwd">
        <el-input type="password" clearable v-model="form.oldPwd"></el-input>
      </el-form-item>
      <el-form-item label="请输入新密码:" prop="newPwd">
        <el-input
          type="password"
          clearable
          v-model="form.newPwd"
          minlength="6"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码确认:" prop="reNewPwd">
        <el-input type="password" clearable v-model="form.reNewPwd"></el-input>
        <span v-show="isShow" style="color: red">两次密码输入不一致</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'pwdReset',
  data() {
    var validateOldPass = (rule, value, callback) => {
      if (!value || value.trim() === '') {
        callback(new Error('旧密码不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (!value || value.trim() === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.reNewPwd && value !== this.form.reNewPwd) {
          callback(new Error('两次输入密码不一致!'))
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      console.log(value)
      if (!value || value.trim() === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {},
      reNewPwd: '',
      isShow: false,
      disabled: true,
      rules: {
        oldPwd: [{ validator: validateOldPass, trigger: 'blur' }],
        newPwd: [{ validator: validatePass, trigger: 'blur' }],
        reNewPwd: [{ validator: validatePass2, trigger: 'blur' }],
      },
    }
  },
  computed: {
    ...mapState({
      roleCode: (state) => state.user.roleCode,
      userCode: (state) => state.user.userCode,
      userName: (state) => state.user.userName,
    }),
  },
  methods: {
    handleBlur() {
      if (this.reNewPwd !== this.form.newPwd) {
        this.isShow = true
        this.disabled = true
      } else {
        this.isShow = false
        this.disabled = false
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.onSubmit()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onSubmit() {
      this.loading = true
      this.$store
        .dispatch('user/resetPassword', {
          ...this.form,
          roleCode: this.roleCode,
          userCode: this.userCode,
          userName: this.userName,
        })
        .then((res) => {
          this.$message.success('修改密码成功')
          this.loading = false
        })
        .catch((err) => {
          this.$message.error('修改密码失败')
          this.loading = false
        })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
