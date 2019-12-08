<template>
  <div class="app-container">
    <div v-loading.fullscreen.lock="loading"></div>
    <div class="createPost-main-container">
      <el-row>
        <el-col :span="24">
          <router-link :to="'/brand/create'">
            <el-button class="w100 mrb-10" type="primary">Tạo chi nhánh</el-button>
          </router-link>
          <div class="list-brand">
            <el-row>
              <el-col v-for="item in list" :key="item.id" :span="24" class="brand-item">
                <router-link :to="'/brand/edit/' + item.id">
                  <h3 class="title">{{item.name}}</h3>
                  <p><span><i class="el-icon-mobile-phone mrr-10"></i><b>Điện thoại: </b>{{item.phone}}</span></p>
                  <p><span><i class="el-icon-location-outline mrr-10"></i><b>Địa chỉ: </b>{{item.location}}</span></p>
                  <p><span><i class="el-icon-time mrr-10"></i><b>Giờ mở cửa: </b> {{item.start_time}} - {{item.end_time}}</span></p>
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
  .brand-item {
    padding: 10px;
    font-size: 15px;
    border-radius: 2px;
    border: 1px solid #DCDFE6;
    margin-bottom: 10px;
    .title {
      font-size: 20px;
      margin: 5px 10px 10px 10px;
    }
    p {
      margin: 5px;
    }
  }
</style>
<script>
import { fetchList } from '@/api/brand'

export default {
  name: 'Brand',
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      loading: true,
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
        this.loading = false
      })
    }
  }
}
</script>
