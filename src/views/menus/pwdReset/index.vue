<template>
  <div style="width: 500px">
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="请输入旧密码:">
        <el-input type="password" clearable v-model="form.oldPwd"></el-input>
      </el-form-item>
      <el-form-item label="请输入新密码:">
        <el-input
          type="password"
          clearable
          v-model="form.newPwd"
          minlength="6"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码确认:">
        <el-input
          type="password"
          clearable
          v-model="reNewPwd"
          @blur="handleBlur"
        ></el-input>
        <span v-show="isShow" style="color: red">两次密码输入不一致</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="disabled" @click="onSubmit"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'pwdReset',
  data() {
    return {
      form: {},
      reNewPwd: '',
      isShow: false,
      disabled: true,
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
    onSubmit() {
      console.log(this.roleCode, this.userCode, this.name, '11111')
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
