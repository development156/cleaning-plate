<script>
	import { config } from '../config.js'
	import {AppModel} from './models/app.js'
	
	const appModel = new AppModel()
		
		
	export default {
		data() {
					return {
					}
				},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('on show');
			this.getLogin()
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			//在首页的主入口一般都会调一次登录口子，获取秘钥token
					getLogin() {
						var _this=this;
						uni.login({
							success: function(res) {
								if (res.code) {
									const params = {
										code: res.code,
									}
									 
									appModel.login(params)
										.then((response) => {
											console.log("请求成功！");
											console.log(response.data);
											
											_this.$store.dispatch('setUserInfo', response.data)
		   									// uni.setStorageSync('AuthTokens', response.data.token)
											uni.login({
												success(response) {
													uni.setStorageSync('wxCode', response.code);
												}
											})
										})
										.catch((errors) => {
											console.log("请求失败！")
											console.log(errors)
										
										});
								} else {
									console.log('获取用户登录态失败！' + res.errMsg);
								}
							},
							fail: function() {
								uni.showToast({
									title: '微信登录失败',
									icon: 'none'
								})
							}
						});
					}
				}
	}
	
	
	
</script>


<style>
	@import url("static/iconFont.css");
	@import  '~@/static/css/font-icon.css'
	/*每个页面公共css */ 
	/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		::-webkit-scrollbar{
		    display: none;
		}
	/* #endif */
	/* 解决H5 的问题 */
	/* #ifdef H5 */
	    uni-scroll-view .uni-scroll-view::-webkit-scrollbar {
	   
		display: none
	    }

</style>
