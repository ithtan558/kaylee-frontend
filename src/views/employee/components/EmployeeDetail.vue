<template>
  <div class="createPost-container">
    <div v-loading.fullscreen.lock="loading"></div>
    <el-form ref="postForm" :model="postForm" class="form-container" label-width="120px"  label-position="top">
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item label="Họ Tên:" required>
              <el-input v-model="postForm.name" size="small" clearable remote placeholder="Họ Tên" />
            </el-form-item>
            <el-form-item label="Số điện thoại:" required>
              <el-input type="number" v-model="postForm.phone" size="small" clearable remote placeholder="Số điện thoại" />
            </el-form-item>
            <el-form-item label="Mật khẩu:">
              <el-input v-model="postForm.password" placeholder="Mật khẩu đăng nhập" type="password" auto-complete="on"/>
            </el-form-item>
            <!--<el-form-item label="Email:">
              <el-input v-model="postForm.email" size="small" clearable remote placeholder="Email" />
            </el-form-item>-->
            <!--<el-form-item label="Năm sinh:">
              <el-date-picker
                v-model="postForm.birthday"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>-->
            <el-form-item label="Giới tính:">
              <el-radio v-model="postForm.gender" :label="1">Nam</el-radio>
              <el-radio v-model="postForm.gender" :label="2">Nữ</el-radio>
            </el-form-item>
            <el-form-item label="Địa chỉ:">
              <el-input v-model="postForm.address" size="small" clearable remote placeholder="Địa chỉ" />
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
                <div class="el-upload__tip" slot="tip">Định dạng jpg/jpeg/png</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="Chi nhánh:" required>
              <el-select size="small" clearable remote placeholder="Chi nhánh:" v-model="postForm.brand_id">
                <el-option v-for="(item) in brands" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="Loại tài khoản:" required>
              <el-select size="small" clearable remote placeholder="Loại tài khoản:" v-model="postForm.role_id">
                <el-option v-for="(item) in roles" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="clearfix" />
        <br>
        <el-form-item class="text-center">
          <el-button icon="el-icon-check" size="mini" type="primary" @click="submitForm">Đồng ý</el-button>
          <router-link :to="'/employee'">
            <el-button icon="el-icon-back" size="mini" type="info">Quay lại</el-button>
          </router-link>
          <el-button icon="el-icon-delete" v-if="postForm.id" type="danger" size="mini" @click="showPopup(postForm.id)">Xóa</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-dialog
      title="Warning"
      :visible.sync="dialogVisible"
      width="80%"
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
import { fetchEmployee, create, deleteItem } from '@/api/employee'
import { fetchAll as fetchAllRole } from '@/api/role'
import { fetchAll as fetchAllBrand } from '@/api/brand'

const defaultForm = {
  name: '',
  /*email: '',*/
  phone: '',
  password: '',
  /*birthday: '',*/
  gender: '',
  address: '',
  image: '',
  role_id: '',
  brand_id: ''
}

export default {
  name: 'EmployeeDetail',
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
      roles: [],
      brands: [],
      imageFileList: [],
      dialogVisible: false
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
    this.getBrands()
    this.getRoles()
  },
  methods: {
    fetchData(id) {
      this.loading = true
      fetchEmployee(id).then(response => {
        this.postForm = response.data
        this.postForm.gent
        if (response.data.image != null) {
          this.imageFileList.push({
            url: process.env.VUE_APP_API + process.env.VUE_APP_DIR_UPLOAD + response.data.image
          })
          console.log(this.imageFileList)
        }
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        this.loading = false
      })
    },
    getBrands() {
      fetchAllBrand().then(response => {
        this.brands = response.data
      }).catch(err => {
        console.log(err)
      })
    },
    getRoles() {
      fetchAllRole().then(response => {
        this.roles = response.data
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
          formData.append('password', this.postForm.password)
          /*formData.append('email', this.postForm.email)
          formData.append('birthday', this.postForm.birthday)*/
          formData.append('gender', this.postForm.gender)
          formData.append('address', this.postForm.address)
          formData.append('image', this.postForm.image)
          formData.append('role_id', this.postForm.role_id)
          formData.append('brand_id', this.postForm.brand_id)
          create(this.isEdit, formData, this.postForm.id).then(response => {
            this.$notify({
              dangerouslyUseHTMLString: true,
              message: response.message,
              type: 'success'
            })

            this.$router.push({ path: '/employee/' })
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
    },
    showPopup(id) {
      this.dialogVisible = true
      this.id = id
    },
    confirmDelete() {
      this.loading = true
      deleteItem(this.id).then(response => {
        this.$notify({
          message: response.message,
          type: 'success'
        })
      }).finally(() => {
        this.loading = false
      })
      this.dialogVisible = false
      this.$router.push({ path: '/employee/' })
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
