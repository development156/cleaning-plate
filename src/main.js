import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import tabBar from './components/common/tabbar.vue'


Vue.component('tabBar', tabBar)
Vue.prototype.imgUrl="http://8.129.51.225:8080/YouGuang_war"
Vue.config.productionTip = false
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	 store,
  ...App
})
app.$mount()
