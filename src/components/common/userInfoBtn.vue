<template>
	<view class="user-info-container">

		<button class="user-info-btn" open-type="getUserInfo" @getuserinfo="mpGetUserInfo" withCredentials="true">
			<slot></slot>
		</button>
	</view>
</template>

<script>
	import {
		AppModel
	} from '@/models/app.js'
	const appModel = new AppModel();
	export default {
	name: 'userInfoBtn',
		data() {
			return {
				userInfo: {}
			}
		},
		methods: {
			mpGetUserInfo(result) {
				//根据调用系统自带button携带的result信息判断是否有授权信息
				if (result.detail.errMsg !== 'getUserInfo:ok') {
					wx.showToast({
						title: '取消授权',
						icon: 'none',
						duration: 2000
					})
					//hasUserInfo为存储用户是否授权信息
					uni.setStorageSync('hasUserInfo', false)
					return;
				}
				uni.login({
					success(response) {
						uni.setStorageSync('wxCode', response.code);
					}
				})

				var _this = this
				wx.checkSession({
						success() {
							appModel.login({
								code: uni.getStorageSync('wxCode'),
								encryptedData: result.detail.encryptedData,
								iv: result.detail.iv
							}).then(response => {
									console.log(response)
									console.log("打印结果" + '-------------------------------------------------')
									console.log("result")
									console.log(result)
									_this.$store.dispatch('setUserInfo', response.data.data)
									uni.setStorageSync('AuthTokens', response.header.Authorization)
									uni.setStorageSync('judgmentOfAuthority', response.header.judgmentOfAuthority)
									console.log(uni.getStorageSync('AuthTokens'))
									uni.setStorageSync('hasUserInfo', true)
									_this.$emit('onClickBtn')
									_this.userInfo = result.detail.userInfo
									_this.userInfo.openid = response.data.data.openid
									_this.userInfo.type = response.data.data.type
									_this.$store.dispatch('setUserInfo', _this.userInfo)
									console.log("我的信息")
									console.log(_this.userInfo)
									_this.$emit('code', response.data.code)
								
							})


					},
					fail() {
						// console.log('失效');
						uni.login({
							success: function(res) {
								if (res.code) {
									uni.setStorageSync('wxCode', res.code);
									const params = {
										code: res.code
									}

									appModel.login({
										code: uni.getStorageSync('wxCode'),
										encryptedData: result.detail.encryptedData,
										iv: result.detail.iv
									}).then(response => {
											uni.login({
												success(response) {
													uni.setStorageSync('wxCode', response.code);
												}
											})
											_this.$store.dispatch('setUserInfo', response.data.data)
											uni.setStorageSync('AuthTokens', response.header.Authorization)
											uni.setStorageSync('judgmentOfAuthority', response.header.judgmentOfAuthority)
											uni.setStorageSync('hasUserInfo', true)
											_this.$emit('onClickBtn')
											_this.userInfo = result.detail.userInfo
										}
									)
									
									
									
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
				})
		}
	}
	}
</script>

<!-- // 样式重置，这里的样式坑是必踩的 lang="less"-->
<style lang="less" scoped>
	.user-info-btn::after {
		border: 0;
	}

	.user-info-btn {
		background-color: transparent;
		line-height: 0;
		padding: 0;
		font-size: 0;
	}
</style>
