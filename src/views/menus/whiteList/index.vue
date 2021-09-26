<template>
  <div>
    <h4>新增用户</h4>
    <el-form label-width="140px" size="small">
      <el-row>
        <el-col :span="8">
          <el-form-item label="公司名称:">
            <el-input v-model="formSearch.companyName" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户姓名:">
            <el-input v-model="formSearch.companyUserName" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码:">
            <el-input v-model="formSearch.companyUserCode" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态:">
            <el-select
              style="width: 100%"
              v-model="formSearch.userState"
              clearable
            >
              <el-option
                v-for="item in userStates"
                :key="item.code"
                :label="item.codeName"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="角色:">
            <!-- <el-input v-model="formSearch.roleName" clearable></el-input> -->
            <el-select
              style="width: 100%"
              v-model="formSearch.roleCode"
              clearable
            >
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
          <el-button type="primary" @click="getWhiteList">查询</el-button>
          <el-button type="primary" :disabled="!currentRow" @click="toAddUser"
            >新增</el-button
          >
        </el-col>
      </el-row>
    </el-form>
    <h4>查询结果</h4>
    <el-table
      highlight-current-row
      @current-change="handleCurrentChange"
      :data="whiteList"
      border
      style="width: 100%"
    >
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column
        v-for="(item, index) in tabTagName1"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getWhiteList"
      :current-page="page"
      :page-sizes="[10, 15, 20, 25]"
      :page-size="limit"
      layout="prev, pager, next, jumper, ->,  sizes, total"
      :total="total"
      style="text-align: center"
    >
    </el-pagination>
    <el-button
      type="primary"
      :disabled="!currentRow || currentRow.userState === '有效'"
      @click="setState('1')"
      >设置为有效</el-button
    >
    <el-button
      type="primary"
      :disabled="!currentRow || currentRow.userState === '失效'"
      @click="setState('0')"
      >设置为失效</el-button
    >
    <el-button
      type="primary"
      :disabled="!currentRow || currentRow.userState === '解绑'"
      @click="setState('2')"
      >解除绑定</el-button
    >
    <h4>用户访问轨迹</h4>
    <el-table
      :data="operaterRecordList"
      height="250"
      border
      style="width: 100%"
    >
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column
        v-for="(item, index) in tabTagName2"
        :key="index"
        :prop="item.prop"
        :label="item.label"
      >
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange1"
      @current-change="getRecord"
      :current-page="page1"
      :page-sizes="[10, 30, 50, 70]"
      :page-size="limit1"
      layout="prev, pager, next, jumper, ->,  sizes, total"
      :total="total1"
      style="text-align: center"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'whiteList',
  data() {
    return {
      formSearch: {},
      page: 1, // 默认页码
      limit: 10, // 每页的条数
      total: 0, // 总条数
      page1: 1, // 默认页码
      limit1: 50, // 每页的条数
      total1: 0, // 总条数
      currentRow: null,
      userStates: [],
      roletypes: [],
      tabTagName1: [
        {
          prop: 'companyName',
          label: '公司名称',
          width: '300',
        },
        {
          prop: 'companyUserCode',
          label: '手机号码',
        },
        {
          prop: 'companyUserName',
          label: '用户姓名',
        },
        {
          prop: 'userState',
          label: '状态',
        },
        {
          prop: 'loginDate',
          label: '最后登录时间',
        },
        {
          prop: 'roleName',
          label: '角色',
        },
        {
          prop: 'addUser',
          label: '操作人员',
        },
      ],
      tabTagName2: [
        {
          prop: 'visitedPages',
          label: '访问页面',
        },
        {
          prop: 'visitedDate',
          label: '访问日期',
        },
      ],
      whiteList: [],
      operaterRecordList: [],
    }
  },
  computed: {
    ...mapGetters(['userCode']),
  },
  methods: {
    async getWhiteList(page = 1) {
      if (typeof page != 'object') {
        this.page = page
      }
      const {
        companyCode,
        companyName,
        companyUserCode,
        companyUserName,
        userState,
        roleCode,
      } = this.formSearch
      const result = await this.$API.table.getList({
        companyCode,
        companyName,
        companyUserCode,
        companyUserName,
        userState,
        roleCode,
        currentPage: this.page,
        pageSize: this.limit,
      })
      if (result.code === 200) {
        this.whiteList = result.dataInfo.whiteUserListVOList
        this.total = result.dataInfo.total

        this.operaterRecordList = []
        this.total1 = 0
      } else {
        this.$message.error(result.msg)
      }
    },
    async getRecord(page = 1) {
      this.page1 = page
      const result = await this.$API.table.getOperateRecord({
        companyUserCode: this.currentRow.companyUserCode,
        currentPage: this.page1,
        pageSize: this.limit1,
      })
      if (result.code === 200) {
        this.operaterRecordList = result.dataInfo.operaterRecordList
        // 保存数据
        this.total1 = result.dataInfo.total
      }
    },
    async setState(state) {
      const result = await this.$API.table.changeState({
        companyUserCode: this.currentRow.companyUserCode,
        userState: state,
      })
      if (result.code === 200) {
        this.$message.success('更改状态成功')
        this.getWhiteList()
        // this.operaterRecordList = result.dataInfo.operaterRecordList
        // // 保存数据
        // this.total1 = result.dataInfo.total
      }
    },
    toAddUser() {
      const { companyCode, companyName } = this.currentRow
      this.$router.push({
        name: 'addUser',
        query: {
          company: { companyCode, companyName },
        },
      })
    },
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
    // 每页显示多少条数据
    handleSizeChange(limit) {
      this.limit = limit
      // 重新获取数据
      this.getWhiteList()
    },
    // 每页显示多少条数据
    handleSizeChange1(limit) {
      this.limit1 = limit
      // 重新获取数据
      this.getRecord()
    },

    handleCurrentChange(val) {
      this.currentRow = val
      this.getRecord()
    },
    add() {},
  },
  mounted() {
    this.getWhiteList()
    // this.getRecord()
    this.getState()
    this.getRole()
  },
}
</script>

<style lang="scss" scoped>
</style>
