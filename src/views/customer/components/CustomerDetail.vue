<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" label-width="120px"  label-position="top">
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item label="Tên khách hàng:">
              <el-input v-model="postForm.name" size="small" clearable remote placeholder="Tên khách hàng" />
            </el-form-item>
            <el-form-item label="Số điện thoại:">
              <el-input v-model="postForm.phone" size="small" clearable remote placeholder="Số điện thoại" />
            </el-form-item>
            <el-form-item label="Email:">
              <el-input v-model="postForm.email" size="small" clearable remote placeholder="Email" />
            </el-form-item>
            <el-form-item label="Năm sinh:">
              <el-date-picker
                v-model="postForm.birthday"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd">
              </el-date-picker>
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
          <router-link :to="'/customer'">
            <el-button icon="el-icon-back" size="mini" type="info">Quay lại</el-button>
          </router-link>
          <el-button v-if="postForm.id" type="danger" size="mini"  @click="showPopup(postForm.id)">Xóa</el-button>
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
  import { fetchCustomer, create, deleteItem } from '@/api/customer'

  const defaultForm = {
    id: undefined,
    name: '',
    phone: '',
    email: '',
    birthday: null,
    image: null
  }

  export default {
    name: 'CustomerDetail',
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
      this.tempRoute = Object.assign({}, this.$route)
    },
    methods: {
      fetchData(id) {
        fetchCustomer(id).then(response => {
          this.postForm = response.data
          if (response.data.image != null) {
            this.imageFileList.push({
              url: process.env.VUE_APP_API + process.env.DIR_UPLOAD + response.data.image
            })
            console.log(this.imageFileList)
          }
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
            formData.append('email', this.postForm.email)
            formData.append('birthday', this.postForm.birthday)
            formData.append('image', this.postForm.image)
            create(this.isEdit, formData, this.postForm.id).then(response => {
              this.$notify({
                dangerouslyUseHTMLString: true,
                message: response.message,
                type: 'success'
              })

              this.$router.push({ path: '/customer/' })
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
        this.getList()
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
