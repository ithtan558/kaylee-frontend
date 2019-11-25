<template>
  <div class="app-container">
    <div class="createPost-main-container">
      <el-row :gutter="10">
        <el-col :span="10" class="hidden-xs-only">
          <div class="panel panel-flat">
            <div class="panel-heading">
              <div class="customer-block-title select-inside-heading">
                <i class="el-icon-document-copy"></i>
                Đơn Hàng
                <div class="dropdown mega-menu mega-menu-wide">
                  <span class="mt-5 pull-right mr-20 hide-on-1024 ng-binding">Chờ thanh toán</span>
                </div>
              </div>
            </div>
            <div class="panel-body" style="position: relative">
              <div class="customer-block-details no-margin pt-10 pos-customer-info">
                <div class="customer-avatar-square-small">
                  <el-image src="https://nganan.salonhero.vn/images/placeholder_avatar_sqr.jpg"></el-image>
                </div>
              </div>
              <div class="order-cashier">
                <span class="text-grey ng-binding">Ngày hóa đơn:</span>
                <br>
                <span class="text-grey">Giờ vào/ra:</span>
                <br>
                <span class="text-grey ng-binding">N.viên thu ngân:</span>
              </div>
              <div class="clearfix" />
              <div class="order-details-item-list-wrapper">
                <el-table
                  :data="tableData"
                  height="245"
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    label="Sản phẩm và dịch vụ"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="Số lượng"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="Thành tiền">
                  </el-table-column>
                </el-table>
              </div>
              <div class="order-checkout-block">
                <div class="order-total-subtotal">
                  <div>Thành tiền</div>
                  <p currency-filter="" value="0" class="ng-isolate-scope">
                    <span class="cash-vnd ">0</span>
                  </p>
                  <br class="clear" />
                </div>
                <div class="order-total-discount text-danger">
                  <div >Giảm giá<span aria-hidden="true" style=""> (%)
                    <a has-permission="pos.discount.update">(Thêm giảm giá)</a>
                  </span>
                  </div>
                  <p>
                    <span class="text-danger ng-isolate-scope" currency-filter="" value="0"><span class="cash-vnd text-danger">0</span>
                    </span>
                  </p>
                  <br class="clear" />
                </div>
                <hr class="no-margin">
                <div class="order-total-price">
                  <div style="font-size: 20px" class="ng-binding">Tổng tiền</div>
                  <p ng-class="{'text-primary': true, 'font-20': true}" currency-filter="" value="0" class="ng-isolate-scope text-primary font-20">
                    <span ng-class="ngClass" class="cash-vnd  text-primary font-20">0</span>
                  </p>
                  <br class="clear" />
                </div>
                <div class="order-total-checkout-buttons mrt-10">
                  <el-button class="fl" icon="el-icon-delete" size="mini" type="danger">{{ $t('cancel')}}</el-button>
                  <el-button class="fr" icon="el-icon-money" size="mini" type="primary">{{ $t('payment')}}</el-button>
                  <el-button class="fr" icon="el-icon-printer" size="mini" type="primary">{{ $t('printOrder')}}</el-button>
                  <br class="clear" />
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="14">
          <div class="panel panel-flat">
            <div class="panel-heading pt-5-important pb-5-important">
              <el-input v-model="listQuery.keyword" placeholder="Tìm kiếm theo tên hoặc mã sản phẩm">
                <el-button slot="append" icon="el-icon-search" @click="getListService"></el-button>
              </el-input>
            </div>
            <div class="panel-body" style="position: relative">
              <div class="title-service-product mrt-10">
                <div class="product-grid">
                  <el-col v-for="item in listService" :key="item.id" class="grid-two-column" :xs="24" :sm="14">
                    <div class="product-image fl" v-bind:style="{ 'background-image': 'url(' + item.image + ')' }"></div>
                    <div class="fl" style="width: calc(100% - 82px);height: 100%;padding: 10px;">
                      <div class="product-name-action">
                        <div class="product-name fl">{{item.name}}</div>
                        <div class="product-action fr">
                          <el-button size="mini" type="primary" @click="addToCart(item)">Chọn</el-button>
                        </div>
                        <br class="clear" />
                      </div>
                      <div class="sku-price">
                        <div class="product-sku fl">{{item.code}}</div>
                        <div class="price fr">
                          <span class="cash">{{item.price | formatMoney}}</span>
                        </div>
                        <br class="clear" />
                      </div>
                    </div>
                  </el-col>
                </div>
                <div>
                  <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getListService" />
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div id="footer">
      <span class="fl"><b class="color-red">{{cartItems.length}}</b> Dịch vụ và sản phẩm được chọn</span>
      <el-button class="fr" size="mini" type="primary" @click="showPopupKindOfCustomer">{{ $t('start')}}</el-button>
    </div>
    <!-- Select kind of customer popup -->
    <el-dialog :visible.sync="popupKindOfCustomerVisible" width="80%">
      <el-form ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-container>
          <el-row>
            <el-col :xs="24" class="mrb-10 text-center"><el-button type="primary" @click="popupFindCustomerVisible = true, popupKindOfCustomerVisible = false">Tìm theo số điện thoại</el-button></el-col>
            <el-col :xs="24" class="mrb-10 text-center"><el-button type="primary" @click="popupNewCustomerVisible = true, popupKindOfCustomerVisible = false">Tạo khách hàng</el-button></el-col>
            <el-col :xs="24" class="mrb-10 text-center"><el-button type="primary" @click="setCustomerForCart(''), popupKindOfCustomerVisible = false">Khách lẻ</el-button></el-col>
            <el-col :xs="24" class="mrb-10 text-center"><el-button @click="popupKindOfCustomerVisible = false">Hủy</el-button></el-col>
          </el-row>
        </el-container>
      </el-form>
    </el-dialog>

    <!-- Select find customer by phone -->
    <el-dialog :visible.sync="popupFindCustomerVisible" width="80%">
      <el-form ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-row>
          <el-input v-model="findCustomer.keyword" placeholder="Nhập số điện thoại"></el-input>
        </el-row>
        <el-row>
          <ul class="list-customer">
            <li v-for="item in customers" :key="item.id" @click="setCustomerForCart(item),popupFindCustomerVisible = false ">
              <span class="fl text-left">{{item.name}}</span>
              <span class="fr text-right">{{item.phone}}</span>
              <br class="clear">
            </li>
          </ul>
        </el-row>
        <el-row class="text-center">
          <el-button type="primary" class="mrt-10" @click="findListCustomer">Tìm khách hàng</el-button>
        </el-row>
      </el-form>
    </el-dialog>

    <!-- Select create a new customer -->
    <el-dialog :visible.sync="popupNewCustomerVisible" width="80%">
      <el-form ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-container>
          <el-row>
            <el-col :xs="24">
              <el-input class="mrb-10 text-center" v-model="createCustomer.name" placeholder="Nhập họ tên"></el-input>
            </el-col>
            <el-col :xs="24">
              <el-input class="mrb-10 text-center" v-model="createCustomer.phone" placeholder="Nhập số điện thoại"></el-input>
            </el-col>
            <el-col :xs="24">
              <el-input class="mrb-10 text-center" v-model="createCustomer.email" placeholder="Nhập email (nếu có)"></el-input>
            </el-col>
            <el-col :xs="24" class="text-center">
              <el-button class="mrb-10" type="primary" @click="setCustomerForCart(createCustomer), popupNewCustomerVisible = false">Tiếp theo</el-button>
            </el-col>
          </el-row>
        </el-container>
      </el-form>
    </el-dialog>
  </div>
</template>

<style>
  .list-customer li {
    border-bottom: 1px solid #DCDFE6;
    padding: 5px 0px;
  }
  .list-customer li:last-child {
    border-bottom: none;
  }
</style>

<script>
import { fetchList as fetchListService } from '@/api/service'
import { getCustomer } from '@/api/customer'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import Cookies from 'js-cookie'

export default {
  name: 'Order',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      listService: null,
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
      dialogVisible: false,
      tableData: [],
      cartItems: [],
      findCustomer: {
        keyword: null
      },
      customers: [],
      createCustomer: {
        name: '',
        phone: '',
        email: ''
      },
      popupKindOfCustomerVisible: false,
      popupFindCustomerVisible: false,
      popupNewCustomerVisible: false
    }
  },
  created() {
    this.getListService()

    // Load cart if exist before
    if (Cookies.get('cartItems')) {
      this.cartItems = JSON.parse(Cookies.get('cartItems'))
    }
  },
  methods: {
    setCustomerForCart(item) {
      Cookies.set('cartCustomer', JSON.stringify(item))
      this.$router.push({ path: '/order/cart' })
    },
    findListCustomer() {
      getCustomer(this.findCustomer).then(response => {
        this.customers = response.data
      })
    },
    showPopupKindOfCustomer() {
      // Check empty cart
      const cartItems = Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : undefined
      if (cartItems === undefined || cartItems.length === 0) {
        this.$notify({
          dangerouslyUseHTMLString: true,
          message: 'Không có dịch vụ nào trong giỏ hàng',
          type: 'error'
        })
        return
      }
      this.popupKindOfCustomerVisible = true
    },
    getListService() {
      this.listLoading = true
      fetchListService(this.listQuery).then(response => {
        this.listService = response.data.items
        this.listService.forEach(element => {
          element.image = process.env.VUE_APP_API + '/upload/images/' + element.image
        })
        this.total = response.data.total
        // Just to simulate the time of the request
        this.listLoading = false
      })
    },
    // Add Items to cart
    addToCart(itemToAdd) {
      // Add the item or increase qty
      const itemInCart = this.cartItems.filter(item => item.id === itemToAdd.id)
      const isItemInCart = itemInCart.length > 0

      if (isItemInCart === false) {
        itemToAdd.qty = 1
        this.cartItems.push(itemToAdd)
      } else {
        itemInCart[0].qty += 1
      }

      console.log(this.cartItems)
      Cookies.set('cartItems', JSON.stringify(this.cartItems))
    }
  }
}
</script>
