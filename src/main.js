import Vue from 'vue'
import money from 'v-money'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // Internationalization
import './icons' // icon
import './permission' // permission control
import './utils/errorLog' // error log

import * as filters from './filters' // global filters
import moment from 'moment'

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
window.Vue = Vue
Vue.use(money, {precision: 4})

Vue.mixin({
  methods: {
    handleRemoveImage() {
      delete this.postForm.image
    },
    handelBeforeUploadImage(file) {
      const allowExtension = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/bmp']
      if (allowExtension.indexOf(file.raw.type) <= -1) {
        this.$notify.error(this.$t('message.invalidExtension'))
      } else {
        this.postForm.image = file.raw
      }
    },
    handleRemoveThumbnail() {
      delete this.postForm.thumbnail
    },
    handelBeforeUploadThumbnail(file) {
      const allowExtension = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/bmp']
      if (allowExtension.indexOf(file.raw.type) <= -1) {
        this.$notify.error(this.$t('message.invalidExtension'))
      } else {
        this.postForm.thumbnail = file.raw
      }
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    formatDate(value) {
      return moment(value).format('YYYY-DD-MM')
    }
  }
})
