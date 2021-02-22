<template>
	<view class="mine-container">
		<header >
			<!--  hasAuthorUrserInfo -->
			<view class="view-header_root" v-if="hasUserInfo" >
				<view>
					<image class="avatar-img" :src="userInfo.avatarUrl | formatAvatarUrl"  @click="navTo"></image>
					<image class="avatar-img2" :src="starUrl" v-if="userInfo.starId > 0"></image>
				</view>
				<text>{{userInfo.nickName | formatUserName}}</text>
			</view>
			<view class="view-header_root" v-else>
				<userInfoBtn @onClickBtn="onGetAuthData" >
					<section class="un-auth">
						<view>
							<image class="avatar-img" :src="userInfo.avatarUrl | formatAvatarUrl"></image>
							<image class="avatar-img2" :src="starUrl" v-if="userInfo.starId > 0"></image>
						</view>
						<text>uni-小程序 默认用户名称</text>
					</section>
				</userInfoBtn>
			</view>
		</header>
		
		<main>
			<view class="top-cnt"></view>
			<view class="btm-cnt">
				<!-- <view class="view-item-container" v-for="item in cellDataArray" :key="index" @tap="jumpToLoveRecord(item)">
					<text class="text-item-title">{{item}}</text>
				</view> -->
				<view class="view-item-container" >
				<!-- 	<text class="text-item-title1">{{item}}</text> -->
					<text class="text-item-title"  @click="navTo6">上传历史</text>
					<text class="text-item-title1" @click="navTo2">订单</text>
					<text class="text-item-title2" @click="navTo1">反馈</text>
					<text class="text-item-title3"  @click="navTo3">兑换</text>
					
				</view>
				<!-- <view class="view-item-container logout-cell" @tap="logoutFansTeam">
					<text :class="logOutCell.img"></text>
					<text class="text-item-title">{{logOutCell.title}}</text>
				</view> -->
				<view class="bottom">
					柚见食光
				</view>
			</view>
		</main>
		
		<!-- <neil-modal :auto-close="false" :show="logout" :confirmColor="'#F73657'" @cancel="bindBtn" @confirm="bindBtn"
		 :confirmText="'确认'" :cancelText="'取消'">
			<view class="logout-modal-content">
				<view class="logout-title">是否确定</view>
			</view>
		</neil-modal> -->
	</view>
</template>

<script>
	// import neilModal from '@/components/neil-modal/neil-modal.vue'
	import userInfoBtn from '@/components/common/userInfoBtn.vue'
	import { mapGetters } from 'vuex'

	export default {
		components: {
			// neilModal,
			userInfoBtn
		},
		data() {
			return {
				hasUserInfo:false,
				cellDataArray: [
					"上传历史","订单","兑换","反馈"
				],
				// logOutCell: {
				// 	img: 'icon-font icon-redeem_icon',
				// 	title: '弹框',
				// 	type: 4
				// },
				idolName: "",
				logout: false,
				newNickname: "",
				idolInfo: {},
				starUrl: ''
			}
		},
		
		computed: {
			...mapGetters([
				'userInfo'
			])
		},
		filters: {
			formatAvatarUrl(val) {
				if (val) {
					return val
				} else {
					return require('@/static/images/common/default-avatar.png')
				}
			},
			formatUserName(val) {
				console.log(val)
				if (val) {
					return val
				} else {
					return 'uni-小程序 默认用户名'
				}
			}
		},
		
		onShow() {
			// this.getInitData()
			console.log("mine onShow")
			
			// let	res=uni.getStorageSync("hasUserInfo")
			// 			this.hasUserInfo=res
			// 			console.log("hasUserInfo")
			// 			console.log(res)
		},
		methods: {
			logoutFansTeam() {
				this.idolName = this.userInfo.starName;
				this.logout = true;
			},
			onGetAuthData() {
			    	//授权成功后的回调事件
			    	console.log('success')
				let res=uni.getStorageSync("hasUserInfo")
				this.hasUserInfo=res
				
			    },
			//爱心记录
			jumpToLoveRecord(item) {
				switch(item.type) {
					case 1:
						uni.navigateTo({
							url: '../home'
						});
						break;
					case 2:
						uni.navigateTo({
							url: '../home'
						});
						break;
					case 4:
						this.showOffical = true;
						break;
				}
			},
			bindBtn(type) {
				this.logout = false
			},
			navTo(){	
				console.log("啦啦啦啦")
				uni.navigateTo({
				url:'./changeInfo/changeInfo'
				})
			},
			//跳转我的反馈界面
			navTo1(){
				console.log("啦啦啦啦")
				uni.navigateTo({
				url:'./feedBack/feedBack'
				})
			},
			//跳转我的订单界面
			navTo2(){
				console.log("啦啦啦啦")
				uni.navigateTo({
				url:'./myOrder/myOrder'
				})
			},
			navTo3(){
				uni.navigateTo({
				url:'./ExchangeHistory/ExchangeHistory'
				})
			},
			// 跳转我的上传历史界面
			navTo6(){
				uni.navigateTo({
				url:'./uploadHistory/index'
				})
			}
			
		}
	}
	
	
</script>
<!-- lang="less" -->

<style lang="less"   scoped>

	// @import '@/static/iconFont.css',;
	@import '@/static/css/font-icon.css';
	.mine-container {
		.user-info-container {
			button {
				line-height: 40upx;
			}
			
		}
		
	}
	.input-nickname {
		width: 462upx;
		height: 86upx;
		margin-bottom: 16upx;
		margin-top: 16upx;
		background: #FFFFFF;
		border: 1upx solid #F0F0F0;
		border-radius: 4upx;
		display: flex;
		align-items: center;

		>input {
			width: 398upx;
			margin: 16upx 32upx;
			font-family: PingFangSC-Regular;
			font-size: 28upx;
			color: #212121;
		}
	}

	.neil-modal__footer {
		border-top: 1px solid #e5e5e5;
	}


	.view-item-container {
		display: flex;
		flex-direction:column;
		align-items: center;
		color: #FFFFFF 10000%;
		.text-item-title{
			margin:0 4rem 0rem 6.75rem ;
			letter-spacing: 5;
			font-family: "方正新书宋-标准";
			font-size: 32px;
			letter-spacing: 7px;
			width: 12.5rem;
		}
		.text-item-title1,.text-item-title2,.text-item-title3 {
			margin:20% 6.75rem 0rem 6.75rem ;
			letter-spacing: 5;
			font-family: "方正新书宋-标准";
			font-size: 32px;
			letter-spacing: 7px;
		}
		
		
	}
	

	.view-header_root {
		width: 750upx;
		
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: -45upx;
		padding: 0 40upx 0 30upx;
		text {
			display: block;
			height: 60upx;
			margin-top: 25upx;
			font-size: 24upx;
			color: #fff;
		}
		.un-auth {
			display: flex;
			flex-direction: column;
		}
	}

	.view-header_root {
			margin-top: 40%;
		>view {
			&:nth-child(1) {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: row;
			
			}

			&:nth-child(2) {
				width: 436upx;
			}
		}
	}

	.avatar-img {
		width: 120upx;
		height: 120upx;
		border-radius: 60upx;
	}


	page {
		height: 100%;
		
		.mine-container {
			background: -webkit-linear-gradient(top, #151515 0%,#848f94 0%,#485f67 0%,#485e69 4%,#4a5e67 4%,#4d5c63 24%,#4e5b61 28%,#505b5d 28%,#53585a 40%,#57585a 42%,#595651 59%,#5e5452 63%,#5d544f 63%,#5e534f 67%,#5e544b 67%,#655146 89%,#665043 89%,#665043 97%,#694e43 97%,#694e43 100%);
			height: 100%;
			>header {
			
				width: 750upx;
				height: 312upx;
			
				display: flex;
				flex-direction: row;
				
			}

			>main {
			position: relative;
				bottom: 0;
				.btm-cnt {
					margin-top: 30%;
					
					padding: 0 32upx;
				
					>view {
						display: flex;
						font-family:"arial, helvetica, sans-serif";
						font-size: 32upx;
						color: #ffffff;
					}
					
				}
				.bottom{
						margin:25% auto;
						margin-left: 40%;
						position:relative;
						font-size: 0.75rem;
						
					}
				
			}
		}
	}

	
</style>
