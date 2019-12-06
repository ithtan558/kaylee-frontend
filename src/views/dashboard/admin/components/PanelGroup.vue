<template>
  <div>
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="24" :sm="12" :lg="8" class="card-panel-col">
        <router-link :to="'/report'">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-chart">
              <svg-icon icon-class="chart" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">Báo cáo doanh thu</div>
              <count-to :start-val="0" :end-val="revenue.total_value" :duration="1000" class="card-panel-num" />
            </div>
          </div>
        </router-link>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8" class="card-panel-col">
        <div class="card-panel" @click="showPopupLater">
          <div class="card-panel-icon-wrapper icon-calendar">
            <svg-icon icon-class="calendar" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              {{ $t('booking') }}
            </div>
            <count-to :start-val="0" :end-val="3" :duration="2600" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-calculator">
            <svg-icon icon-class="calculator" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">Đơn hàng</div>
            <count-to :start-val="0" :end-val="countOrder" :duration="3000" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              {{ $t('customer') }}
            </div>
            <count-to :start-val="0" :end-val="countCustomer" :duration="3200" class="card-panel-num" />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40" class="panel-group-second">
      <!--<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper">
            <i class="el-icon-house"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              {{ $t('businessProfile') }}
            </div>
          </div>
        </div>
      </el-col>-->
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper hidden-xs-only">
            <i class="el-icon-s-order"></i>
          </div>
          <div class="card-panel-description">
            <router-link :to="'/order/history'">
              <div class="card-panel-text">
                {{ $t('orderList') }}
              </div>
            </router-link>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="showPopupLater">
          <div class="card-panel-icon-wrapper hidden-xs-only">
            <i class="el-icon-printer"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              {{ $t('revenueReport') }}
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper hidden-xs-only">
            <i class="el-icon-user"></i>
          </div>
          <div class="card-panel-description">
            <router-link :to="'/employee'">
              <div class="card-panel-text">
                {{ $t('employeeList') }}
              </div>
            </router-link>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="showPopupLater">
          <div class="card-panel-icon-wrapper hidden-xs-only">
            <i class="el-icon-price-tag"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              {{ $t('productInventory') }}
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper hidden-xs-only">
            <i class="el-icon-location"></i>
          </div>
          <div class="card-panel-description">
            <router-link :to="'/brand'">
              <div class="card-panel-text">
                {{ $t('businessBrand') }}
              </div>
            </router-link>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper hidden-xs-only">
            <i class="el-icon-service"></i>
          </div>
          <div class="card-panel-description">
            <router-link :to="'/service'">
              <div class="card-panel-text">
                {{ $t('serviceList') }}
              </div>
            </router-link>
          </div>
        </div>
      </el-col>
      <!--<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper">
            <i class="el-icon-s-shop"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              {{ $t('productList') }}
            </div>
          </div>
        </div>
      </el-col>-->
    </el-row>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import { getDateRangeOfToday } from '@/common'
import { getCount as countCustomer } from '@/api/customer'
import { getCount as countOrder, getTotal } from '@/api/order'

export default {
  name: 'ServiceDetail',
  components: {
    CountTo
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      countCustomer: 0,
      countOrder: 0,
      revenue_query: {
        start_date: null,
        end_date: null
      },
      revenue: {
        total_value: 0
      }
    }
  },
  computed: {
  },
  created() {
    this.getCountCustomer()
    this.getCountOrder()
    this.getTotal()
  },
  methods: {
    getTotal() {
      getTotal(this.revenue_query).then(response => {
        this.revenue.total_value = response.data.total_value
      }).catch(err => {
        console.log(err)
      })
    },
    getCountCustomer() {
      countCustomer().then(response => {
        this.countCustomer = response.data
      }).catch(err => {
        console.log(err)
      })
    },
    getCountOrder() {
      countOrder().then(response => {
        this.countOrder = response.data
      }).catch(err => {
        console.log(err)
      })
    },
    showPopupLater() {
      this.$notify({
        dangerouslyUseHTMLString: true,
        message: 'Chức năng đang phát triển',
        type: 'warning'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 20px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-calendar {
         background: #40c9c6;
      }
      .icon-people {
        background: #36a3f7;
      }
      .icon-calculator {
        background: #f4516c;
      }
    }
    .icon-calendar {
      color: #40c9c6;
    }
    .icon-people {
      color: #36a3f7;
    }
    .icon-calculator {
      color: #f4516c;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      text-align: right;
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
.panel-group-second {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    padding: 15px;
    width: 100%;
    display: table;
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .card-panel-description {
        .card-panel-text {
          color: #fff;
        }
      }
      background: #64d9d6;
    }
    .icon-calendar {
      color: #40c9c6;
    }
    .icon-people {
      color: #36a3f7;
    }
    .icon-calculator {
      color: #f4516c;
    }
    .card-panel-icon-wrapper {
      transition: all 0.38s ease-out;
      border-radius: 6px;
      display: table-cell;
      vertical-align: middle;
      i {
        font-size: 30px;
      }
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
      }
    }
    .card-panel-num {
      font-size: 20px;
    }
  }
}
</style>
