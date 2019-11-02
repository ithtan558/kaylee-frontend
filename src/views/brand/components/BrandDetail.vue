<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" label-width="120px"  label-position="top">
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item label="Tên cửa hàng:" required>
              <el-input v-model="postForm.name" size="small" clearable remote placeholder="Tên cửa hàng" />
            </el-form-item>
            <el-form-item label="Số điện thoại:" required>
              <el-input type="number" v-model="postForm.phone" size="small" clearable remote placeholder="Số điện thoại" />
            </el-form-item>
            <el-form-item label="Địa chỉ:">
              <el-input v-model="postForm.location" size="small" clearable remote placeholder="Địa chỉ" />
            </el-form-item>
            <el-form-item label="Thành phố:" required>
              <el-select size="small" clearable remote placeholder="Thành phố:" v-model="postForm.city_id" @change="handelForDistrict">
                <el-option v-for="(item) in cities" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="Quận/Huyện:" required>
              <el-select size="small" clearable remote placeholder="Quận/Huyện:" v-model="postForm.district_id">
                <el-option v-for="(item) in districts" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="Giờ mở cửa:" required>
              <el-time-select v-model="postForm.start_time" placeholder="Mở cửa">
              </el-time-select>
              <el-time-select v-model="postForm.end_time" placeholder="Đóng cửa">
              </el-time-select>
            </el-form-item>
            <el-form-item label="Hình ảnh:" prop="image">
              <el-upload
                action=""
                list-type="picture-card"
                :file-list="imageFileList"
                :on-remove="handleRemoveImage"
                :on-change="handelBeforeUploadImage"
                :auto-upload="false"
                :multiple="false"
                :limit="1"
              >
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="clearfix" />
        <br>
        <el-form-item class="text-center">
          <el-button icon="el-icon-check" size="mini" type="primary" @click="submitForm">Tạo</el-button>
          <router-link :to="'/brand'">
            <el-button icon="el-icon-back" size="mini" type="info">Quay lại</el-button>
          </router-link>
          <el-button v-if="postForm.id" type="danger" size="mini" @click="showPopup(postForm.id)">Xóa</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-dialog
      title="Warning"
      :visible.sync="dialogVisible"
      width="30%"
      center
    >
      <span>Bạn có muốn xóa dử liệu này ?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Không</el-button>
        <el-button type="danger" @click="confirmDelete">Có</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchListCity } from '@/api/city'
import { fetchListDistrict, fetchListDistrictByCityId } from '@/api/district'
import { fetchBrand, create, deleteItem } from '@/api/brand'

const defaultForm = {
  id: undefined,
  name: '',
  phone: '',
  location: '',
  city_id: '',
  district_id: '',
  start_time: '',
  end_time: '',
  image: ''
}

export default {
  name: 'BrandDetail',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      rules: {
      },
      tempRoute: {},
      cities: [],
      districts: [],
      imageFileList: [],
      dialogVisible: false
    }
  },
  computed: {
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
    this.getCities()
    this.getDistricts()
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      fetchBrand(id).then(response => {
        this.postForm = response.data
        if (response.data.image != null) {
          this.imageFileList.push({
            url: process.env.VUE_APP_API + process.env.VUE_APP_DIR_UPLOAD + response.data.image
          })
          console.log(this.imageFileList)
        }
      }).catch(err => {
        console.log(err)
      })
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
          const formData = new FormData()
          formData.append('id', this.postForm.id)
          formData.append('name', this.postForm.name)
          formData.append('phone', this.postForm.phone)
          formData.append('location', this.postForm.location)
          formData.append('city_id', this.postForm.city_id)
          formData.append('district_id', this.postForm.district_id)
          formData.append('start_time', this.postForm.start_time)
          formData.append('end_time', this.postForm.end_time)
          formData.append('image', this.postForm.image)
          create(this.isEdit, formData, this.postForm.id).then(response => {
            this.$notify({
              dangerouslyUseHTMLString: true,
              message: response.message,
              type: 'success'
            })

            this.$router.push({ path: '/brand/' })
          }).catch(error => {
            if (error.response) {
              this.$notify({
                dangerouslyUseHTMLString: true,
                message: error.response.data.message,
                type: 'error'
              })
            }
          }).then(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    showPopup(id) {
      this.dialogVisible = true
      this.id = id
    },
    confirmDelete() {
      deleteItem(this.id).then(response => {
        this.$notify({
          message: response.message,
          type: 'success'
        })
      })
      this.dialogVisible = false
      this.$router.push({ path: '/brand/' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 20px 10px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
}
</style>
