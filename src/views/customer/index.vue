<template>

  <div class="app-container">
    <div v-loading.fullscreen.lock="loading"></div>
    <div class="createPost-main-container">
      <el-row>
        <el-col :span="24">
          <router-link :to="'/customer/create'">
            <el-button class="w100 mrb-10" type="primary">Tạo khách hàng</el-button>
          </router-link>
          <div class="search">
            <el-input v-model="listQuery.keyword" placeholder="Tìm kiếm theo tên">
              <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
            </el-input>
          </div>
          <div class="list-customer mrt-30">
            <el-row>
              <el-col v-for="item in list" :key="item.id" :span="24" class="customer-item">
                <router-link :to="'/customer/edit/' + item.id">
                  <div class="fl" style="width: calc(100% - 82px)">
                    <div class="customer-name">{{item.name}}</div>
                    <div class="customer-phone">{{item.phone}}</div>
                  </div>
                </router-link>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row :span="24">
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      </el-row>
    </div>
  </div>
</template>

<style>
  .customer-item {
    border-radius: 2px;
    border: 1px solid #DCDFE6;
    margin-bottom: 10px;
    padding: 10px;
  }
  .customer-name {
    font-size: 12px;
    color: #4a90e2;
    word-break: break-word;
    margin: 5px;
    text-transform: uppercase;
    font-weight: 700;
  }
  .customer-phone {
    margin: 5px;
    font-size: 12px;
  }
</style>
<script>
import { fetchList } from '@/api/customer'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Customer',
  components: { Pagination },
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
      fetchList(this.listQuery).then(response => {

        this.list = response.data.items
        this.total = response.data.total
        // Just to simulate the time of the request
        this.listLoading = false
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
