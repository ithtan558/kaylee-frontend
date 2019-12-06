<template>
  <div class="app-container">
    <div v-loading.fullscreen.lock="loading"></div>
    <div class="createPost-main-container">
      <el-row>
        <el-col :span="24">
          <h3 class="text-center">Thống kê</h3>
          <div class="mrb-15">
            <el-select :default-first-option="true" v-model="brand_id" placeholder="Tất cả chi nhánh" clearable style="width: 400px;" @change="resetByBrand">
              <el-option value="">Tất cả chi nhánh</el-option>
              <el-option
                v-for="item in brands"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <el-card class="box-card mrb-10">
            <div slot="header" class="clearfix">
              <span>{{revenue.daterange}}</span>
              <el-select filterable remote :default-first-option="true" v-model="revenue.type" @change="getTotal">
                <el-option
                  v-for="item in dates"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div class="text item">
              Tổng doanh thu: {{revenue.total_value | formatMoney}}
            </div>
          </el-card>
          <el-card class="box-card mrb-10">
            <div slot="header" class="clearfix">
              <span>Doanh thu theo nhân viên</span>
              <el-select filterable remote :default-first-option="true" v-model="revenue_employee.type"  @change="getTotalByEmployeeAndDate">
                <el-option
                  v-for="item in dates"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div v-for="item in this.revenue_employee.list" class="item" :key="item.id">
              <span class="fl">{{item.name}}</span>
              <span class="fr">{{item.amount | formatMoney}}</span>
              <br class="clear">
            </div>
          </el-card>
          <el-card class="box-card mrb-10">
            <div slot="header" class="clearfix">
              <span>Doanh thu theo dịch vụ</span>
              <el-select filterable remote :default-first-option="true" v-model="revenue_service.type"  @change="getTotalByServiceAndDate">
                <el-option
                  v-for="item in dates"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div v-for="item in this.revenue_service.list" class="item" :key="item.id">
              <span class="fl">{{item.name}}</span>
              <span class="fr">{{item.amount | formatMoney}}</span>
              <br class="clear">
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss">
  .box-card {
    .el-select {
      background: none;
      float: right;
      text-align: right;
      input {
        height: auto !important;
        line-height: inherit !important;
        padding: 0px !important;
        background: none;
        border: none;
        text-align: right;
        margin: 0px;
        color: white;
      }
    }
    .item {
      margin-bottom: 5px;
      padding-bottom: 5px;
      border-bottom: 1px solid #DCDFE6;
    }
    .item:last-child {
      border-bottom: none;
    }
  }
</style>

<script>
import { getDateRangeOfToday, getDateRangeOfWeek, getDateRangeOfMonth, getDateRangeOfYear } from '@/common'
import { fetchAll as fetchAllBrand } from '@/api/brand'
import { getTotal, getTotalByEmployeeAndDate, getTotalByServiceAndDate } from '@/api/order'

export default {
  name: 'Report',
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
      dialogVisible: false,
      brand_id: '',
      brands: [],
      revenue: {
        type: '1',
        daterange: null,
        total_value: 0
      },
      revenue_query: {
        daterange: null,
        start_date: null
      },
      revenue_employee: {
        type: '1',
        daterange: null,
        list: []
      },
      revenue_employee_query: {
        daterange: null,
        start_date: null
      },
      revenue_service: {
        type: '1',
        daterange: null,
        list: []
      },
      revenue_service_query: {
        daterange: null,
        start_date: null
      },
      dates: [
        {
          value: '1',
          label: 'Hôm nay'
        },
        {
          value: '2',
          label: 'Tuần'
        },
        {
          value: '3',
          label: 'Tháng'
        },
        {
          value: '4',
          label: 'Năm'
        },
      ]
    }
  },
  created() {
    this.loading = true
    this.getBrands()
    const date = new Date()
    const today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    this.revenue_query.start_date = today
    this.revenue_query.end_date = today
    this.revenue.daterange = today
    this.getTotal()
    this.getTotalByEmployeeAndDate()
    this.getTotalByServiceAndDate()
    this.loading = false
  },
  methods: {
    async resetByBrand() {
      await this.getTotal()
      await this.getTotalByEmployeeAndDate()
      await this.getTotalByServiceAndDate()
    },
    getBrands() {
      fetchAllBrand().then(response => {
        response.data.forEach(element => {
          this.brands.push({
            label: element.name,
            value: element.id
          })
        })
      }).catch(err => {
        console.log(err)
      })
    },

    getTotal() {
      let obj
      if (this.revenue.type === '1') {
        obj = getDateRangeOfToday()
      } else if (this.revenue.type === '2') {
        obj = getDateRangeOfWeek()
      } else if (this.revenue.type === '3') {
        obj = getDateRangeOfMonth()
      } else {
        obj = getDateRangeOfYear()
      }

      this.revenue_query.start_date = obj.start_date
      this.revenue_query.end_date = obj.end_date
      this.revenue_query.brand_id = this.brand_id

      getTotal(this.revenue_query).then(response => {
        this.revenue.total_value = response.data.total_value
      }).catch(err => {
        console.log(err)
      })
    },
    getTotalByEmployeeAndDate() {
      let obj
      if (this.revenue_employee.type === '1') {
        obj = getDateRangeOfToday()
      } else if (this.revenue_employee.type === '2') {
        obj = getDateRangeOfWeek()
      } else if (this.revenue_employee.type === '3') {
        obj = getDateRangeOfMonth()
      } else {
        obj = getDateRangeOfYear()
      }

      this.revenue_employee_query.start_date = obj.start_date
      this.revenue_employee_query.end_date = obj.end_date
      this.revenue_employee_query.brand_id = this.brand_id

      getTotalByEmployeeAndDate(this.revenue_employee_query).then(response => {
        this.revenue_employee.list = response.data
      }).catch(err => {
        console.log(err)
      })
    },
    getTotalByServiceAndDate() {

      this.loading = true
      let obj
      if (this.revenue_service.type === '1') {
        obj = getDateRangeOfToday()
      } else if (this.revenue_service.type === '2') {
        obj = getDateRangeOfWeek()
      } else if (this.revenue_service.type === '3') {
        obj = getDateRangeOfMonth()
      } else {
        obj = getDateRangeOfYear()
      }

      this.revenue_service_query.start_date = obj.start_date
      this.revenue_service_query.end_date = obj.end_date
      this.revenue_service_query.brand_id = this.brand_id

      getTotalByServiceAndDate(this.revenue_service_query).then(response => {
        this.revenue_service.list = response.data
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
