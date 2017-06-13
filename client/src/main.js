// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store/store'
import * as VueGoogleMaps from 'vue2-google-maps'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import locale from 'element-ui/lib/locale/lang/id'

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
Vue.use(VueGoogleMaps, { load: { key: 'AIzaSyDbQoQWg-S8OgEk-2tHpW7UOtye1ZGaOeo' }})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
