<template>
  <div class="app-container">
    <div v-loading.fullscreen.lock="loading"></div>
    <div class="createPost-main-container">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="14">
          <h3 class="text-center">Lịch sử đơn hàng</h3>
          <el-row class="w100">
            <el-col :xs="24">
              <el-card class="box-card w100" v-for="item in list" :key="item.id">
                <div slot="header" class="clearfix">
                  <span>{{item.name}}</span>
                  <span class="fr">#{{item.code}}</span>
                </div>
                <div class="text item" :span="24">
                  <div class="time">Thời gian : {{item.created_at}}</div>
                  <div><b>Chi tiết đơn hàng</b></div>
                  <div>Dịch vụ sử dụng</div>
                  <div class="body-service">
                    <div class="item-service" v-for="itemOrderDetail in item.order_details" :key="itemOrderDetail.id">
                      <span class="fl">{{itemOrderDetail.name}}</span>
                      <span class="fr price">{{itemOrderDetail.total | formatMoney}}</span>
                      <span class="fr">{{itemOrderDetail.quantity}}</span>
                      <br class="clear">
                    </div>
                  </div>
                  <div>
                    <span class="fl">Giảm giá</span>
                    <span class="fr text-right">{{item.discount  | formatMoney}}</span>
                    <br class="clear">
                  </div>
                  <div class="body-discount">

                  </div>
                  <div class="total color-red fr"><b>{{item.amount | formatMoney}}</b></div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row class="w100">
            <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box-card {
  margin-bottom: 10px;
  .item {
    > div {
      margin: 5px 0px;
      span {
        margin: 2px 0px 2px 10px;
      }
      .price {
        width: 100px;
        text-align: right;
      }
    }
  }
}
</style>

<script>
import { fetchList } from '@/api/order'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'OrderHistory',
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
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
