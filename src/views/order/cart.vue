<template>
  <div class="app-container">
    <div class="createPost-main-container">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="14">
          <h3 class="text-center mr-0 mrb-15">Đơn hàng</h3>
          <el-container>
            <el-form class="form-container w100">
              <el-form-item class="info-customer" :xs="24">
                <div class="title">Thông tin khách hàng</div>
                <div class="body">
                  <span class="fl">{{cartCustomer.name ? cartCustomer.name : 'Khách lẽ'}}</span>
                  <span class="fr text-right">{{cartCustomer.phone}}</span>
                    <br class="clear">
                </div>
              </el-form-item>
              <el-form-item class="info-cart" :xs="24">
                <div class="title">Thông tin đơn hàng</div>
                <div class="body">
                  <el-col v-for="item in cartItems" :key="item.id" :span="24" class="product-item">
                    <div class="product-image fl" v-bind:style="{ 'background-image': 'url(' + item.image + ')' }"></div>
                    <div class="fl" style="width: calc(100% - 82px)">
                      <div class="product-name-price">
                        <span class="name fl">{{item.name}}</span>
                        <span class="price fr">{{item.price * item.qty | formatMoney}}</span>
                        <br class="clearmini" />
                      </div>
                      <div class="qty-action">
                        <div class="qty fl">
                          <el-input size="mini" v-model="item.qty" @change="updateTotal"></el-input>
                        </div>
                        <div class="action fr">
                          <el-button size="mini" icon="el-icon-delete" @click="removeItemCart(item)"></el-button>
                        </div>
                        <br class="clearmini" />
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="24" class="total text-right">
                    <span><b class="color-red">Tổng tiền : {{total | formatMoney}}</b></span>
                  </el-col>
                </div>
              </el-form-item>
              <el-form-item class="text-center">
                <router-link :to="'/order'">
                  <el-button icon="el-icon-back" size="mini" type="info">Quay lại</el-button>
                </router-link>
                <el-button icon="el-icon-delete" size="mini" type="danger" @click="removeCart">Xóa đơn hàng</el-button>
                <el-button icon="el-icon-check" size="mini" type="primary" @click="submitForm()">Thanh toán</el-button>
              </el-form-item>
            </el-form>
          </el-container>
        </el-col>
      </el-row>
    </div>

    <!-- Information order -->
    <el-dialog :visible.sync="popupShowStatusOrderVisible" width="80%" :before-close="handleClose">
      <el-container>
        <el-row>
          <el-col :xs="24" class="mrb-10 text-center color-success">{{message}}</el-col>
          <el-col :xs="24" class="mrb-10 text-center">
            <router-link :to="'/order/history'">
              <el-button>Lịch sử đơn hàng</el-button>
            </router-link>
          </el-col>
          <el-col :xs="24" class="mrb-10 text-center">
            <router-link :to="'/order'">
              <el-button>Tiếp tục thu ngân</el-button>
            </router-link>
          </el-col>
        </el-row>
      </el-container>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
  .title {
    font-weight: bold;
  }
  .info-customer {
    .body {
      font-size: 12px;
      border-radius: 2px;
      border: 1px solid #DCDFE6;
      margin-bottom: 10px;
      padding: 10px;
    }
  }
  .product-name-price {
    padding: 0px 10px;
    .name {
      font-weight: bold;
    }
  }
  .qty-action {
    padding: 0px 10px;
    margin-top: 8px;
  }
  .el-input--mini {
    width: 100px;
  }
  .el-button+.el-button {
    margin-left: 0px;
  }
</style>

<script>
import 'element-ui/lib/theme-chalk/display.css'
import { create } from '@/api/order'
import Cookies from 'js-cookie'

export default {
  name: 'Cart',
  data() {
    return {
      total: 0,
      listLoading: true,
      cartItems: [],
      cartCustomer: [],
      message: '',
      popupShowStatusOrderVisible: false
    }
  },
  created() {
    this.cartItems = JSON.parse(Cookies.get('cartItems'))
    this.cartItems.forEach(item => {
      this.total += item.price + item.qty
    })
    this.cartCustomer = JSON.parse(Cookies.get('cartCustomer'))
  },
  methods: {
    updateTotal() {
      this.total = 0
      this.cartItems.forEach(item => {
        this.total += item.price * item.qty
      })
    },
    removeItemCart(itemCart) {
      const cartItems = this.cartItems
      this.cartItems.forEach(function(item, key) {
        if (item.id === itemCart.id) {
          cartItems.splice(key, 1)
          Cookies.set('cartItems', JSON.stringify(cartItems))
          return
        }
      })
    },
    removeCart() {
      Cookies.set('cartItems', [])
      Cookies.set('cartCustomer', '')
      this.$router.push({ path: '/order' })
    },
    submitForm() {
      this.loading = true
      const data = {
        'cart_items': this.cartItems,
        'cart_customer': this.cartCustomer
      }
      create(data).then(response => {
        Cookies.set('cartItems', [])
        Cookies.set('cartCustomer', '')
        this.popupShowStatusOrderVisible = true
        this.message = response.message
        console.log(this.message)
      }).catch(error => {
        if (error.response) {
          this.$notify({
            dangerouslyUseHTMLString: true, message: error.response.data.message, type: 'error'
          })
        }
      }).then(() => {
        this.loading = false
      })
    },
    handleClose() {
      this.$router.push({ path: '/order' })
    }
  }
}
</script>
