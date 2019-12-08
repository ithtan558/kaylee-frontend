<template>
  <div class="createPost-container">
    <div v-loading.fullscreen.lock="loading"></div>
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" label-width="120px"  label-position="top">
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item label="Tên dịch vụ:" required>
              <el-input v-model="postForm.name" size="small" clearable remote placeholder="Tên dịch vụ" />
            </el-form-item>
            <el-form-item label="Mã dịch vụ:" required>
              <el-input v-model="postForm.code" size="small" clearable remote placeholder="Mã dịch vụ" />
            </el-form-item>
            <!--<el-form-item label="Loại dịch vụ:" required>
              <el-select v-model="postForm.category_id" placeholder="Select" clearable style="width: 400px;">
                <el-option
                  v-for="item in categories"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>-->
            <el-form-item label="Chi nhánh:" required>
              <el-select v-model="postForm.brand_ids" multiple placeholder="Select" clearable style="width: 400px;">
                <el-option
                  v-for="item in brands"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Thời gian phục vụ:" required>
              <el-input v-model="postForm.time" size="small" clearable remote placeholder="Thời gian phục vụ">
                <template slot="append">Phút</template>
              </el-input>
            </el-form-item>
            <el-form-item label="Giá:" required>
              <el-input type="number" v-model="postForm.price" size="small" clearable remote placeholder="Giá">
                <template slot="append">VND</template>
              </el-input>
            </el-form-item>
            <el-form-item label="Mô tả:">
              <el-input type="textarea" :rows="2" v-model="postForm.description" size="small" clearable remote placeholder="Mô tả" />
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
          </el-col>
        </el-row>
        <div class="clearfix" />
        <br>
        <el-form-item class="text-center">
          <el-button icon="el-icon-check" size="small" type="primary" @click="submitForm">Đồng ý</el-button>
          <router-link :to="'/service'">
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
import { fetchAll as fetchAllBrand } from '@/api/brand'
import { fetchAll as fetchAllServiceCategory } from '@/api/serviceCategory'
import { fetchService, create, deleteItem } from '@/api/service'

const defaultForm = {
  id: undefined,
  name: '',
  code: '',
  description: '',
  brand_ids: null,
  category_id: null,
  time: null,
  price: null,
  image: ''
}

export default {
  name: 'ServiceDetail',
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
    /*this.getCategories()*/
    this.getBrands()
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      this.loading = true
      fetchService(id).then(response => {
        this.postForm = response.data
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
    getCategories() {
      fetchAllServiceCategory().then(response => {
        response.data.forEach(element => {
          this.categories.push({
            label: element.name,
            value: element.id
          })
        })
      }).catch(err => {
        console.log(err)
      })
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
    submitForm() {
      this.postForm.display_time = parseInt(this.display_time / 1000)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          const formData = new FormData()
          formData.append('id', this.postForm.id)
          formData.append('name', this.postForm.name)
          formData.append('code', this.postForm.code)
          formData.append('description', this.postForm.description)
          formData.append('brand_ids', this.postForm.brand_ids)
          formData.append('category_id', this.postForm.category_id)
          formData.append('time', this.postForm.time)
          formData.append('price', this.postForm.price)
          formData.append('image', this.postForm.image)
          create(this.isEdit, formData, this.postForm.id).then(response => {
            this.$notify({
              dangerouslyUseHTMLString: true,
              message: response.message,
              type: 'success'
            })

            this.$router.push({ path: '/service/' })
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
      deleteItem(this.id).then(response => {
        this.$notify({
          message: response.message,
          type: 'success'
        })
      })
      this.dialogVisible = false
      this.$router.push({ path: '/service/' })
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
