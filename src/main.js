import Vue from 'vue'
import App from './App'
import store from './store/index.js'

Vue.prototype.imgUrl="http://8.131.230.3:8080/YouGuang_war"
Vue.config.productionTip = false
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	 store,
  ...App
})
app.$mount()
