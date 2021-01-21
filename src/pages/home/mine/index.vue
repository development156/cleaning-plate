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
					<text class="text-item-title">上传历史</text>
					<text class="text-item-title1" @click="navTo2">订单</text>
					<text class="text-item-title2" @click="navTo1">反馈</text>
					<text class="text-item-title3">兑换</text>
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
		
		<neil-modal :auto-close="false" :show="logout" :confirmColor="'#F73657'" @cancel="bindBtn" @confirm="bindBtn"
		 :confirmText="'确认'" :cancelText="'取消'">
			<view class="logout-modal-content">
				<view class="logout-title">是否确定</view>
			</view>
		</neil-modal>
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
			
			margin:2.25rem 4rem 0rem 6.75rem ;
			letter-spacing: 5;
			font-family: "方正新书宋-标准";
			font-size: 30px;
			letter-spacing: 7px;
			width: 12.5rem;
		}
		.text-item-title1,.text-item-title2,.text-item-title3 {
			margin:2.25rem 6.75rem 0rem 6.75rem ;
			letter-spacing: 5;
			font-family: "方正新书宋-标准";
			font-size: 30px;
			letter-spacing: 20px;
		}
		
	}
.bottom{
			margin: 7.5rem 9.75rem 3.375rem 8rem;
			width: 100%;
		}
	.view-level {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100upx;
	}

	.text-level {
		margin-left: -40upx;
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #FFFFFF;
		line-height: 40upx;
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

	.view-user-info {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		// margin-right: 40upx;
		align-items: center;

		>view {
			display: flex;
			justify-content: center;
			align-items: center;

			>text {
				font-family: PingFangSC-Medium;
				font-size: 32upx;
				color: #FFFFFF;
				letter-spacing: 0;
				display: inline-block;
				max-width: 200upx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
		}
	}

	

	.view-header_root {
			margin-top: 8.9375rem;
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

	.text-question-below {
		// font-family: PingFangSC-Medium;
		font-size: 40upx;
		font-weight: 600;
		color: #FFFFFF;
		margin-left: 32upx;
	}

	.view-question {
		width: 264upx;
		margin-left: 32upx;
		margin-right: 32upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.image-question {
		width: 24upx;
		height: 24upx;
	}

	.text-question {
		font-size: 24upx;
		color: #FFFFFF;
	}

	

	.button-item-title {
		margin-left: 35upx;
		font-family: PingFangSC-Regular;
		font-size: 32upx;
		color: #212121;
		outline: none;
		padding: 0 0;
		width: 610upx;
		background: #FFFFFF;
		text-align: start;

	}

	button::after {
		border: none;
	}


	page {
		height: 100%;
		
		.mine-container {
			background-color: #7094AE;
			height: 100%;
			>header {
			
				width: 750upx;
				height: 312upx;
			
				display: flex;
				flex-direction: row;
				
			}

			>main {

				.btm-cnt {
					margin-top: 6.75rem;
					background-color: #7094AE;
					padding: 0 32upx;

					>view {
						display: flex;
						
						
						font-family:"arial, helvetica, sans-serif";
						font-size: 32upx;
						color: #ffffff;
						

						
					}
					
				}
			}
		}
	}

	.dialog-title {
		font-family: PingFangSC-Regular;
		font-size: 36upx;
		color: #000000;
		text-align: center;
	}

	.dialog-content {
		font-family: PingFangSC-Regular;
		font-size: 30upx;
		color: #888888;
		text-align: center;
		line-height: 40px;
	}

	.view-footer {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.logout-modal-content {
		width: 464upx;
		padding: 30upx 38upx 30upx;
		border-bottom: 1px solid #e5e5e5;
		display: flex;
		flex-direction: column;
		align-items: center;

		.logout-title {
			font-family: PingFangSC-Regular;
			font-size: 36upx;
			color: #000000;
			text-align: center;
			line-height: 50upx;
		}
	}
</style>
