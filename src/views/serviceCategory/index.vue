<template>

  <div class="app-container">
    <div class="createPost-main-container">
      <el-row>
        <el-col :span="24">
          <router-link :to="'/service-category/create'">
            <el-button class="w100 mrb-10" type="primary">Tạo loại dịch vụ</el-button>
          </router-link>
          <div class="list-service-category mrt-30">
            <el-row>
              <el-col v-for="item in list" :key="item.id" :span="24" class="product-item">
                <router-link :to="'/service-category/edit/' + item.id">
                  <div class="fl" style="width: calc(100% - 82px);height: 100%;padding: 10px;">
                    <div>
                      <div class="product-name">{{item.name}}</div>
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

<script>
import { fetchList } from '@/api/serviceCategory'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ServiceCategory',
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

        this.total = response.data.total
        // Just to simulate the time of the request
        this.listLoading = false
      })
    }
  }
}
</script>
