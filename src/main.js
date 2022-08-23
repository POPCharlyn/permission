import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import moment from 'moment'

import BaiduMap from 'vue-baidu-map'
import { BmlMarkerClusterer } from 'vue-baidu-map'
import Lushu from 'bmaplib.lushu'

import '@/styles/index.scss' // global css
import '@/icons' // icon
import '@/permission' // permission control

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.use( BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'AZR0gHS9xezMKCfXVRVVCwYII3MuUmYp',
} )

Vue.component( 'bml-marker-cluster', BmlMarkerClusterer )

Vue.prototype.moment = moment

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
