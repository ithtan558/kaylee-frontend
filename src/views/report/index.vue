<template>

  <div class="app-container">
    <div class="createPost-main-container">
      <el-row>
        <el-col :span="24">
          <h3 class="text-center">Thống kê</h3>
          <div>
            <el-select :default-first-option="true" v-model="brand_id" placeholder="Tất cả chi nhánh" clearable style="width: 400px;">
              <el-option value="">Tất cả chi nhánh</el-option>
              <el-option
                v-for="item in brands"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-date-picker
                v-model="revenue."
                type="daterange"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date">
              </el-date-picker>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{'List item ' + o }}
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import { fetchAll as fetchAllBrand } from '@/api/brand'

export default {
  name: 'Report',
  data() {
    return {
      tableKey: 0,
      list: [],
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
      brand_id: '',
      brands: []
    }
  },
  created() {
    this.getBrands()
  },
  methods: {
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
  }
}
</script>
