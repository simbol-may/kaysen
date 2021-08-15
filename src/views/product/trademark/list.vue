<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin-bottom: 20px"
      @click="showAddTrademark"
      >添加
    </el-button>
    <el-table :data="trademarkList" stripe border style="width: 100%">
      <el-table-column type="index" label="序号" width="100" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称"> </el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO">
        <template slot-scope="scope">
          <img
            :src="scope.row.logoUrl"
            :alt="scope.row.tmName"
            style="width: 100px; height: 60px"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row, $index }">
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-edit"
            @click="handleEdit(row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="deleteTrademark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getTrademarkList"
      :current-page="page"
      :page-sizes="[3, 6, 9, 12]"
      :page-size="limit"
      style="text-align: center"
      layout="prev, pager, next, jumper,->, sizes,total "
      :total="total"
    >
    </el-pagination>
    <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
      <el-form
        :model="formData"
        :rules="rules"
        ref="ruleForm"
        style="width: 80%"
      >
        <el-form-item
          label="品牌名称"
          :label-width="formLabelWidth"
          prop="tmName"
        >
          <el-input v-model="formData.tmName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="品牌LOGO"
          :label-width="formLabelWidth"
          prop="logoUrl"
        >
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="formData.logoUrl"
              :src="formData.logoUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TrademarkList',
  data() {
    return {
      page: 1,
      limit: 3,
      total: 0,
      trademarkList: [
        {
          tmName: '',
          logoUrl: '',
        },
      ],
      dialogFormVisible: false,
      formData: {
        tmName: '',
        logoUrl: '',
      },
      formLabelWidth: '120px',
      rules: {
        tmName: [
          { required: true, message: '请输入活动名称' },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'change',
          },
        ],
        logoUrl: [
          { required: true, message: '请上传品牌LOGO', trigger: 'blur' },
        ],
      },
    }
  },
  mounted() {
    this.getTrademarkList()
  },
  methods: {
    async getTrademarkList(page = 1) {
      this.page = page
      const result = await this.$API.trademark.getTrademarkList(
        page,
        this.limit
      )
      if (result.code === 200) {
        const { records, total } = result.data
        this.trademarkList = records
        this.total = total
      } else {
        this.$message.error('获取品牌列表失败')
      }
    },
    handleSizeChange(limit) {
      this.limit = limit
    },
    showAddTrademark() {
      this.dialogFormVisible = true
    },
    handleAvatarSuccess(res, file) {
      this.formData.logoUrl = res.data
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      const isJPG = ['image/jpeg', 'image/png'].includes(file.type)
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    addOrUpdateTrademark() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return
        const result = await this.$API.trademark.addOrUpdateTrademark(
          this.formData
        )
        if (result.code === 200) {
          this.$message.success('操作成功')
          this.dialogFormVisible = false
          this.getTrademarkList(this.formData.id?this.page:1)
        } else {
          this.$message.error('操作失败')
        }
      })
    },
    deleteTrademark(trademark){
      this.$confirm(`您确定删除${trademark.tmName}吗?`, '删除操作', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
           const result = await this.$API.trademark.deleteTrademark(trademark.id)
            if (result.code===200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            } 
            this.getTrademarkList(this.trademarkList.length===1&&this.page>1?this.page-1:this.page)
        }).catch(() => {
          this.$message.error('删除失败');          
        });
    }
  },
}
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
