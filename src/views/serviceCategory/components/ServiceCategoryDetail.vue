<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" label-width="120px"  label-position="top">
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item label="Tên loại dịch vụ:" required>
              <el-input v-model="postForm.name" size="small" clearable remote placeholder="Tên loại dịch vụ" />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="clearfix" />
        <br>
        <el-form-item class="text-center">
          <el-button icon="el-icon-check" size="small" type="primary" @click="submitForm">Đồng ý</el-button>
          <router-link :to="'/service-category'">
            <el-button icon="el-icon-back" size="small" type="info">Quay lại</el-button>
          </router-link>
          <el-button icon="el-icon-delete" v-if="postForm.id" type="danger" size="small" @click="showPopup(postForm.id)">Xóa</el-button>
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
  import { fetchServiceCategory, create, deleteItem } from '@/api/serviceCategory'

  const defaultForm = {
    id: undefined,
    name: ''
  }

  export default {
    name: 'ServiceCategoryDetail',
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
        categories: [],
        brands: [],
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
        fetchServiceCategory(id).then(response => {
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
      submitForm() {
        this.postForm.display_time = parseInt(this.display_time / 1000)
        this.$refs.postForm.validate(valid => {
          if (valid) {
            this.loading = true
            create(this.isEdit, this.postForm, this.postForm.id).then(response => {
              this.$notify({
                dangerouslyUseHTMLString: true,
                message: response.message,
                type: 'success'
              })

              this.$router.push({ path: '/service-category/' })
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
        this.$router.push({ path: '/service-category/' })
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
