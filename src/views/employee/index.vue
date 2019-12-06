<template>
  <div class="app-container">
    <div v-loading.fullscreen.lock="loading"></div>
    <div class="createPost-main-container">
      <el-row>
        <el-col :span="24">
          <router-link :to="'/employee/create'">
            <el-button class="w100 mrb-10" type="primary">Tạo nhân viên</el-button>
          </router-link>
          <div class="list-employee">
            <el-row>
              <el-col v-for="item in list" :key="item.id" :span="24" class="employee-item">
                <router-link :to="'/employee/edit/' + item.id">
                  <span class="fl name">{{item.name}}</span>
                  <span class="fr phone">{{item.phone}}</span>
                  <br class="clear">
                </router-link>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .employee-item {
    padding: 10px;
    font-size: 13px;
    border-radius: 2px;
    border: 1px solid #DCDFE6;
    margin-bottom: 10px;
    .phone {
      text-align: right;
    }
    p {
      margin: 5px;
    }
  }
</style>
<script>
import { fetchList } from '@/api/employee'

export default {
  name: 'Employee',
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      loading: false,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+_id'
      },
      dialogVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      fetchList().then(response => {
        this.list = response.data.items
        // Just to simulate the time of the request
        this.listLoading = false
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
