<template>

  <div class="app-container">
    <div class="createPost-main-container">
      <el-row>
        <el-col :span="24">
          <router-link :to="'/service/create'">
            <el-button class="w100 mrb-10" type="primary">Tạo dịch vụ</el-button>
          </router-link>
          <div class="search">
            <el-input v-model="listQuery.keyword" placeholder="Tìm kiếm theo tên hoặc mã dịch vụ">
              <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
            </el-input>
          </div>
          <div class="list-service mrt-30">
            <el-row>
              <el-col v-for="item in list" :key="item.id" :span="24" class="product-item">
                <router-link :to="'/service/edit/' + item.id">
                  <div class="product-image fl" v-bind:style="{ 'background-image': 'url(' + item.image + ')' }"></div>
                  <div class="fl" style="width: calc(100% - 82px);height: 100%;padding: 10px;">
                    <div class="product-name-action">
                      <div class="product-name">{{item.name}}</div>
                    </div>
                    <div class="sku-price">
                      <div class="product-sku fl">{{item.code}}</div>
                      <div class="price fr">
                        <span class="cash">{{item.price | formatMoney}}</span>
                      </div>
                      <br class="clear" />
                    </div>
                  </div>
                </router-link>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      </el-row>
    </div>
  </div>
</template>
<style>
  .product-name-action {
    margin-bottom: 24px;
  }
</style>

<script>
import { fetchList } from '@/api/service'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Service',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
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
      this.listLoading = true
      fetchList(this.listQuery).then(response => {

        this.list = response.data.items
        this.list.forEach(element => {
          element.image = process.env.VUE_APP_API + '/upload/images/' + element.image
        })

        this.total = response.data.total
        // Just to simulate the time of the request
        this.listLoading = false
      })
    }
  }
}
</script>
