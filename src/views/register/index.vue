<template>
  <div class="register-container">
    <div v-loading.fullscreen.lock="loading"></div>
    <el-form ref="postForm" :model="postForm" class="register-form" auto-complete="on" label-position="top" label-width="120px">
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <div class="panel panel-flat">
              <div class="panel-heading">
                <div class="customer-block-title select-inside-heading">
                  <span>Tạo tài khoản KAYLEE của bạn</span>
                  <span>Dùng miển phí trong 15 ngày</span>
                </div>
              </div>
              <div class="panel-body" style="position: relative">
                <!--<div class="title">Thông tin đăng ký</div>
                <el-form-item required>
                  <el-input v-model="postForm.name" placeholder="Họ tên của bạn" type="text" auto-complete="on"/>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="postForm.email" placeholder="Email" type="text" auto-complete="on"/>
                </el-form-item>-->
                <div class="title">Thông tin cá nhân và cửa hàng</div>
                <el-form-item required label="Họ tên của bạn">
                  <el-input v-model="postForm.name" placeholder="Họ tên của bạn" type="text" auto-complete="on"/>
                </el-form-item>
                <el-form-item required label="Tên cửa hàng của bạn">
                  <el-input v-model="postForm.name_client" placeholder="Tên cửa hàng của bạn" type="text" auto-complete="on"/>
                </el-form-item>
                <el-form-item required label="Số điện thoại cửa hàng">
                  <el-input v-model="postForm.phone_client" placeholder="Số điện thoại cửa hảng" type="text" auto-complete="on"/>
                </el-form-item>
                <el-form-item required label="Địa chỉ cửa hàng của bạn">
                  <el-input v-model="postForm.location_client" placeholder="Địa chỉ cửa hàng của bạn" type="text" auto-complete="on"/>
                </el-form-item>
                <el-form-item required label="Thành phố:">
                  <el-select size="small" clearable remote placeholder="Thành phố:" v-model="postForm.city_id" @change="handelForDistrict">
                    <el-option v-for="(item) in cities" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
                <el-form-item required label="Quận/Huyện:">
                  <el-select size="small" clearable remote placeholder="Quận/Huyện:" v-model="postForm.district_id">
                    <el-option v-for="(item) in districts" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
                <div class="title">Thông tin đăng nhập</div>
                <el-form-item required label="Số điện thoại đăng nhập">
                  <el-input v-model="postForm.phone" placeholder="Số điện thoại đăng nhập" type="text" auto-complete="on"/>
                </el-form-item>
                <el-form-item required label="Mật khẩu đăng nhập">
                  <el-input v-model="postForm.password" placeholder="Mật khẩu đăng nhập" type="password" auto-complete="on"/>
                </el-form-item>
                <el-form-item class="text-center">
                  <el-button icon="el-icon-check" size="mini" type="primary" @click="submitForm">Đồng ý</el-button>
                  <router-link :to="'/login'">
                    <el-button icon="el-icon-back" size="mini" type="info">Quay lại</el-button>
                  </router-link>
                </el-form-item>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import { register } from '@/api/auth'
import { fetchListCity } from '@/api/city'
import { fetchListDistrict, fetchListDistrictByCityId } from '@/api/district'

export default {
  name: 'Register',
  data() {
    return {
      postForm: {
        name: '',
        name_client: '',
        location_client: '',
        phone_client: '',
        city_id: '',
        district_id: '',
        phone: '',
        password: ''
      },
      loading: false,
      active: 0,
      cities: [],
      districts: []
    }
  },
  created() {

    this.getCities()
    this.getDistricts()
  },
  methods: {
    next() {
      if (++this.active > 2) {
        this.active = 0
      }
    },
    back() {
      if (this.active > 0) {
        --this.active
      }
    },
    getCities() {
      fetchListCity().then(response => {
        response.data.forEach(element => {
          this.cities.push(element)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    getDistricts() {
      fetchListDistrict().then(response => {
        response.data.forEach(element => {
          this.districts.push(element)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    handelForDistrict() {
      this.districts = []
      fetchListDistrictByCityId(this.postForm.city_id).then(response => {
        response.data.forEach(element => {
          this.districts.push(element)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm() {
      this.postForm.display_time = parseInt(this.display_time / 1000)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          register(this.postForm).then(response => {
            this.$notify({
              dangerouslyUseHTMLString: true,
              message: response.message,
              type: 'success'
            })

            this.$router.push({ path: '/login/' })
          }).catch(error => {
            if (error.response) {
              this.$notify({
                dangerouslyUseHTMLString: true,
                message: error.response.data.message,
                type: 'error'
              })
            }
          }).finally(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">

  @supports (-webkit-mask: none) and (not (cater-color: #fff)) {
    .register-container .el-input input {
      color: #6f6f6f;
    }
  }
  .panel {
    .panel-heading {
      text-align: center;
    }
  }

  /* reset element-ui css */
  .register-container {
    display: table;
    margin: 10px auto;
    .title {
      font-size: 14px;
      font-weight: bold;
      margin: 10px 0px 5px 0px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    color: #555;
  }
</style>
