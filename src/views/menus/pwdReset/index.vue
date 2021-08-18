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
          @blur="handleBlur"
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
import { mapGetters } from 'vuex'
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
    ...mapGetters(['name', 'userCode', 'roleCode']),
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
      this.loading = true
      this.$store
        .dispatch('user/resetPassword', {
          ...this.form,
          roleCode: this.roleCode,
          userCode: this.userCode,
          userName: this.name,
        })
        .then(() => {
          // this.$router.push('/home')

          // this.$router.push({ path: this.redirect || '/' })
          this.loading = false
        })
        .catch((err) => {
          console.log(err, '11111')
          this.loading = false
        })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
