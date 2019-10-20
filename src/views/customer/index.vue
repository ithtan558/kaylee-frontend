<template>
  <div class="app-container">
    <div class="createPost-main-container">
      <el-row :gutter="10">
        <el-col :span="10">
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
        <el-col :span="14">
          <div class="panel panel-flat">
            <div class="panel-heading pt-5-important pb-5-important">
              <div class="customer-block-title select-inside-heading">
                <el-input placeholder="Tìm kiếm theo tên hoặc mã sản phẩm & dịch vụ"></el-input>
              </div>
            </div>
            <div class="panel-body" style="position: relative">
              <div class="title-service-product mrt-10">
                <el-tabs type="card" @tab-click="handleClick">
                  <el-tab-pane class="icon-service" label="Dịch vụ">
                    <ul class="product-grid">
                      <li class="grid-two-column">
                        <div class="product-image fl" style="background-image: url(https://s3-ap-northeast-1.amazonaws.com/salonherodev/PROD/Common/Default_Data/Spa/dnyjexdnmw33-300x300.jpg)"></div>
                        <div class="fl" style="width: calc(100% - 82px)">
                          <div class="product-name">
                            Trị mụn
                          </div>
                          <div class="sku-price">
                            <div class="product-sku fl">
                              DV218111
                            </div>
                            <div class="price fr">
                              <span class="cash">120.000 đ</span>
                            </div>
                            <br class="clear" />
                          </div>
                        </div>
                      </li>
                      <li class="grid-two-column">
                        <div class="product-image fl" style="background-image: url(https://s3-ap-northeast-1.amazonaws.com/salonherodev/PROD/Common/Default_Data/Spa/dnyjexdnmw33-300x300.jpg)"></div>
                        <div class="fl" style="width: calc(100% - 82px)">
                          <div class="product-name">
                            Trị mụn
                          </div>
                          <div class="sku-price">
                            <div class="product-sku fl">
                              DV218111
                            </div>
                            <div class="price fr">
                              <span class="cash">120.000 đ</span>
                            </div>
                            <br class="clear" />
                          </div>
                        </div>
                      </li>
                      <li class="grid-two-column">
                        <div class="product-image fl" style="background-image: url(https://s3-ap-northeast-1.amazonaws.com/salonherodev/PROD/Common/Default_Data/Spa/dnyjexdnmw33-300x300.jpg)"></div>
                        <div class="fl" style="width: calc(100% - 82px)">
                          <div class="product-name">
                            Trị mụn
                          </div>
                          <div class="sku-price">
                            <div class="product-sku fl">
                              DV218111
                            </div>
                            <div class="price fr">
                              <span class="cash">120.000 đ</span>
                            </div>
                            <br class="clear" />
                          </div>
                        </div>
                      </li>
                      <li class="grid-two-column">
                        <div class="product-image fl" style="background-image: url(https://s3-ap-northeast-1.amazonaws.com/salonherodev/PROD/Common/Default_Data/Spa/dnyjexdnmw33-300x300.jpg)"></div>
                        <div class="fl" style="width: calc(100% - 82px)">
                          <div class="product-name">
                            Trị mụn
                          </div>
                          <div class="sku-price">
                            <div class="product-sku fl">
                              DV218111
                            </div>
                            <div class="price fr">
                              <span class="cash">120.000 đ</span>
                            </div>
                            <br class="clear" />
                          </div>
                        </div>
                      </li>
                      <li class="grid-two-column">
                        <div class="product-image fl" style="background-image: url(https://s3-ap-northeast-1.amazonaws.com/salonherodev/PROD/Common/Default_Data/Spa/dnyjexdnmw33-300x300.jpg)"></div>
                        <div class="fl" style="width: calc(100% - 82px)">
                          <div class="product-name">
                            Trị mụn
                          </div>
                          <div class="sku-price">
                            <div class="product-sku fl">
                              DV218111
                            </div>
                            <div class="price fr">
                              <span class="cash">120.000 đ</span>
                            </div>
                            <br class="clear" />
                          </div>
                        </div>
                      </li>
                      <li class="grid-two-column">
                        <div class="product-image fl" style="background-image: url(https://s3-ap-northeast-1.amazonaws.com/salonherodev/PROD/Common/Default_Data/Spa/dnyjexdnmw33-300x300.jpg)"></div>
                        <div class="fl" style="width: calc(100% - 82px)">
                          <div class="product-name">
                            Trị mụn
                          </div>
                          <div class="sku-price">
                            <div class="product-sku fl">
                              DV218111
                            </div>
                            <div class="price fr">
                              <span class="cash">120.000 đ</span>
                            </div>
                            <br class="clear" />
                          </div>
                        </div>
                      </li>
                      <li class="grid-two-column">
                        <div class="product-image fl" style="background-image: url(https://s3-ap-northeast-1.amazonaws.com/salonherodev/PROD/Common/Default_Data/Spa/dnyjexdnmw33-300x300.jpg)"></div>
                        <div class="fl" style="width: calc(100% - 82px)">
                          <div class="product-name">
                            Trị mụn
                          </div>
                          <div class="sku-price">
                            <div class="product-sku fl">
                              DV218111
                            </div>
                            <div class="price fr">
                              <span class="cash">120.000 đ</span>
                            </div>
                            <br class="clear" />
                          </div>
                        </div>
                      </li>
                      <li class="grid-two-column">
                        <div class="product-image fl" style="background-image: url(https://s3-ap-northeast-1.amazonaws.com/salonherodev/PROD/Common/Default_Data/Spa/dnyjexdnmw33-300x300.jpg)"></div>
                        <div class="fl" style="width: calc(100% - 82px)">
                          <div class="product-name">
                            Trị mụn
                          </div>
                          <div class="sku-price">
                            <div class="product-sku fl">
                              DV218111
                            </div>
                            <div class="price fr">
                              <span class="cash">120.000 đ</span>
                            </div>
                            <br class="clear" />
                          </div>
                        </div>
                      </li>
                      <li class="grid-two-column">
                        <div class="product-image fl" style="background-image: url(https://s3-ap-northeast-1.amazonaws.com/salonherodev/PROD/Common/Default_Data/Spa/dnyjexdnmw33-300x300.jpg)"></div>
                        <div class="fl" style="width: calc(100% - 82px)">
                          <div class="product-name">
                            Trị mụn
                          </div>
                          <div class="sku-price">
                            <div class="product-sku fl">
                              DV218111
                            </div>
                            <div class="price fr">
                              <span class="cash">120.000 đ</span>
                            </div>
                            <br class="clear" />
                          </div>
                        </div>
                      </li>
                      <li class="grid-two-column">
                        <div class="product-image fl" style="background-image: url(https://s3-ap-northeast-1.amazonaws.com/salonherodev/PROD/Common/Default_Data/Spa/dnyjexdnmw33-300x300.jpg)"></div>
                        <div class="fl" style="width: calc(100% - 82px)">
                          <div class="product-name">
                            Trị mụn
                          </div>
                          <div class="sku-price">
                            <div class="product-sku fl">
                              DV218111
                            </div>
                            <div class="price fr">
                              <span class="cash">120.000 đ</span>
                            </div>
                            <br class="clear" />
                          </div>
                        </div>
                      </li>
                      <li class="grid-two-column">
                        <div class="product-image fl" style="background-image: url(https://s3-ap-northeast-1.amazonaws.com/salonherodev/PROD/Common/Default_Data/Spa/dnyjexdnmw33-300x300.jpg)"></div>
                        <div class="fl" style="width: calc(100% - 82px)">
                          <div class="product-name">
                            Trị mụn
                          </div>
                          <div class="sku-price">
                            <div class="product-sku fl">
                              DV218111
                            </div>
                            <div class="price fr">
                              <span class="cash">120.000 đ</span>
                            </div>
                            <br class="clear" />
                          </div>
                        </div>
                      </li>
                      <li class="grid-two-column">
                        <div class="product-image fl" style="background-image: url(https://s3-ap-northeast-1.amazonaws.com/salonherodev/PROD/Common/Default_Data/Spa/dnyjexdnmw33-300x300.jpg)"></div>
                        <div class="fl" style="width: calc(100% - 82px)">
                          <div class="product-name">
                            Trị mụn
                          </div>
                          <div class="sku-price">
                            <div class="product-sku fl">
                              DV218111
                            </div>
                            <div class="price fr">
                              <span class="cash">120.000 đ</span>
                            </div>
                            <br class="clear" />
                          </div>
                        </div>
                      </li>
                    </ul>
                  </el-tab-pane>
                  <el-tab-pane icon="el-icon-s-shop"  label="Sản phẩm">
                    <ul class="product-grid">
                      <li class="grid-two-column">
                        <div class="product-image fl" style="background-image: url(https://s3-ap-northeast-1.amazonaws.com/salonherodev/PROD/Common/Default_Data/Spa/8234q9rqmwns-300x300.jpg)"></div>
                        <div class="fl" style="width: calc(100% - 82px)">
                          <div class="product-name">
                            Tẩy trang Ohui
                          </div>
                          <div class="sku-price">
                            <div class="product-sku fl">
                              SP218115
                            </div>
                            <div class="price fr">
                              <span class="cash">620.000 đ</span>
                            </div>
                            <br class="clear" />
                          </div>
                        </div>
                      </li>
                      <li class="grid-two-column">
                        <div class="product-image fl" style="background-image: url(https://s3-ap-northeast-1.amazonaws.com/salonherodev/PROD/Common/Default_Data/Spa/8234q9rqmwns-300x300.jpg)"></div>
                        <div class="fl" style="width: calc(100% - 82px)">
                          <div class="product-name">
                            Tẩy trang Ohui
                          </div>
                          <div class="sku-price">
                            <div class="product-sku fl">
                              SP218115
                            </div>
                            <div class="price fr">
                              <span class="cash">620.000 đ</span>
                            </div>
                            <br class="clear" />
                          </div>
                        </div>
                      </li>
                      <li class="grid-two-column">
                        <div class="product-image fl" style="background-image: url(https://s3-ap-northeast-1.amazonaws.com/salonherodev/PROD/Common/Default_Data/Spa/8234q9rqmwns-300x300.jpg)"></div>
                        <div class="fl" style="width: calc(100% - 82px)">
                          <div class="product-name">
                            Tẩy trang Ohui
                          </div>
                          <div class="sku-price">
                            <div class="product-sku fl">
                              SP218115
                            </div>
                            <div class="price fr">
                              <span class="cash">620.000 đ</span>
                            </div>
                            <br class="clear" />
                          </div>
                        </div>
                      </li>
                      <li class="grid-two-column">
                        <div class="product-image fl" style="background-image: url(https://s3-ap-northeast-1.amazonaws.com/salonherodev/PROD/Common/Default_Data/Spa/8234q9rqmwns-300x300.jpg)"></div>
                        <div class="fl" style="width: calc(100% - 82px)">
                          <div class="product-name">
                            Tẩy trang Ohui
                          </div>
                          <div class="sku-price">
                            <div class="product-sku fl">
                              SP218115
                            </div>
                            <div class="price fr">
                              <span class="cash">620.000 đ</span>
                            </div>
                            <br class="clear" />
                          </div>
                        </div>
                      </li>
                      <li class="grid-two-column">
                        <div class="product-image fl" style="background-image: url(https://s3-ap-northeast-1.amazonaws.com/salonherodev/PROD/Common/Default_Data/Spa/8234q9rqmwns-300x300.jpg)"></div>
                        <div class="fl" style="width: calc(100% - 82px)">
                          <div class="product-name">
                            Tẩy trang Ohui
                          </div>
                          <div class="sku-price">
                            <div class="product-sku fl">
                              SP218115
                            </div>
                            <div class="price fr">
                              <span class="cash">620.000 đ</span>
                            </div>
                            <br class="clear" />
                          </div>
                        </div>
                      </li>
                      <li class="grid-two-column">
                        <div class="product-image fl" style="background-image: url(https://s3-ap-northeast-1.amazonaws.com/salonherodev/PROD/Common/Default_Data/Spa/8234q9rqmwns-300x300.jpg)"></div>
                        <div class="fl" style="width: calc(100% - 82px)">
                          <div class="product-name">
                            Tẩy trang Ohui
                          </div>
                          <div class="sku-price">
                            <div class="product-sku fl">
                              SP218115
                            </div>
                            <div class="price fr">
                              <span class="cash">620.000 đ</span>
                            </div>
                            <br class="clear" />
                          </div>
                        </div>
                      </li>
                      <li class="grid-two-column">
                        <div class="product-image fl" style="background-image: url(https://s3-ap-northeast-1.amazonaws.com/salonherodev/PROD/Common/Default_Data/Spa/8234q9rqmwns-300x300.jpg)"></div>
                        <div class="fl" style="width: calc(100% - 82px)">
                          <div class="product-name">
                            Tẩy trang Ohui
                          </div>
                          <div class="sku-price">
                            <div class="product-sku fl">
                              SP218115
                            </div>
                            <div class="price fr">
                              <span class="cash">620.000 đ</span>
                            </div>
                            <br class="clear" />
                          </div>
                        </div>
                      </li>
                      <li class="grid-two-column">
                        <div class="product-image fl" style="background-image: url(https://s3-ap-northeast-1.amazonaws.com/salonherodev/PROD/Common/Default_Data/Spa/8234q9rqmwns-300x300.jpg)"></div>
                        <div class="fl" style="width: calc(100% - 82px)">
                          <div class="product-name">
                            Tẩy trang Ohui
                          </div>
                          <div class="sku-price">
                            <div class="product-sku fl">
                              SP218115
                            </div>
                            <div class="price fr">
                              <span class="cash">620.000 đ</span>
                            </div>
                            <br class="clear" />
                          </div>
                        </div>
                      </li>
                    </ul>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Order',
  components: {  },
  data() {
    return {
      tableKey: 0,
      list: null,
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
      uuid: null,
      dialogVisible: false
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
