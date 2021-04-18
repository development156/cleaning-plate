<template>
	<view class="content" v-if="isLogin==true">
		<view class="tit">暖心食光</view>
		<view class="iconAll">
			<view class="iconfont icon-yonghu icon1" @click="navTo2" style="font-size: 2.6rem;color: white;">

			</view>
			<view class="iconfont icon-chakantiezigengduo icon2" @click="navTo5" style="font-size: 2.6rem;color: white;">

			</view>
		</view>

		<view class="top">

			<view class="box1" @click="confirmDialog">
				<view class="iconfont icon-xiangjipaizhao image" style="font-size:3.125rem;margin-left: 30% ;"></view>
				<text>上传照片</text>
			</view>

			<navigator class="box2" url="exchangeZone/index">
				<view class="iconfont icon-shangcheng image" style="font-size:3.125rem"></view>
				<text>兑换专区</text>
			</navigator>

			<view class="box3" @click="navTo3">
				<view class="iconfont icon-zhuangxiushangjia image" style="font-size: 1.25rem;margin-top: 5%;"></view>
				<text>菜品展示</text>
			</view>


			<view class="box4" @click="navTo">
				<view class="iconfont icon-gonggao1 image" style="font-size: 2rem;margin-bottom: 10%;"></view>
				<text>公告</text>

			</view>


			<navigator class="box5" url="ort/index">
				<view class="iconfont icon-tongjitu image" style="font-size:1.875rem"></view>
				<text>剩菜分析</text>

			</navigator>

		</view>


		<!-- 提交信息 -->
		<uni-popup ref="popupShare">
			<uni-popup-define @select="select"></uni-popup-define>
		</uni-popup>


	</view>
</template>
<script>
	import uniPopup from '@/components/common/uni-popup/uni-popup.vue'
	import {
		MyInfo
	} from '@/models/MyModel/changeInfo.js'
	const myInfo = new MyInfo()
	import uniPopupDefine from './upload/index.vue'
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			uniPopup,
			uniPopupDefine
		},
		// 添加用户信息权限
		computed: {
			...mapGetters([
				'userInfo'
			]),



		},
		onLoad() {
			this.getMyInformation()
		},
		data() {
			return {
				isLogin: false,
				studentId: 1,
				user: [],
			}
		},

		onShow() {

			let a = this.userInfo.nickName
			if (a == null) {
				this.isLogin = false
				//没有登录过
				uni.navigateTo({
					url: './login/login'
				});
			} else {
				this.isLogin = true
			}
		},


		methods: {
			navTo() {
				uni.navigateTo({
					url: 'advertising/advertisingList/advertisingList'
				})
			},
			navTo2() {
				uni.navigateTo({
					url: 'mine/index'
				})
			},
			navTo3() {
				uni.navigateTo({
					url: 'foodShow/CanteenList'
				})
			},
			navTo4() {
				uni.navigateTo({
					url: 'upload/index'
				})
			},
			navTo5() {
				uni.navigateTo({
					url: 'space/index'
				})
			},
			//打开弹框
			confirmDialog() {
				this.$refs.popupShare.open()
			},
			// 获得个人信息
			getMyInformation() {
				if (this.userInfo.nickName != null) {
					myInfo.getMyInformation(this.studentId).then(res => {
						console.log(res)
						this.user = res.data
						this.$store.dispatch('setMyInfo', this.user)
					})
				}

			},

		}
	}
</script>
<style>
	page {
		background: url('https://z3.ax1x.com/2021/04/15/cRGOt1.jpg') no-repeat;
		background-size: 100% 100%;

	}
</style>
<style lang="scss" scoped>
	.content {
		.tit {
			margin: 11% 5% 5%;
			color: white;
			font-size: 30px;
		}

		.iconAll {
			justify-content: space-between;
			display: flex;
			margin: 3% 5% 0 5%;

		}

		.top {
			color: white;
			display: flex;
			justify-content: space-evenly;
			flex-wrap: wrap;
			margin: 40% 0 12.28% 0;

			.box1,
			.box2 {
				color: #666666;
				
				box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.3);
				
				@include gy("", 15px, align-center, 42.7%, 215px);
					background: -webkit-linear-gradient(left, rgba(180,164,140,1) 0%,rgba(206,191,170,1) 36%,rgba(218,206,183,1) 60%,rgba(224,213,193,1) 70%,rgba(234,225,204,1) 100%);

				text {
					margin-left: 25%;
					font-size: 20px;
				}

				.image {
					display: block;
					margin: 0 auto;
					@include gy(45px, '', '', 2.75rem, 2.75rem);
					margin-bottom: 1.625rem;


				}
			}

			.box3,
			.box4 {
				color: #666666;
				@include gy(5%, 15px, align-center, 43%, 5.1875rem);
				box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.3);
				// background: -webkit-linear-gradient(-45deg, rgba(105,78,67,1) 25%,rgba(186,144,119,1) 100%);
			background: -webkit-linear-gradient(-45deg, rgba(167,147,123,1) 0%,rgba(176,158,134,1) 14%,rgba(181,165,140,1) 30%,rgba(205,190,169,1) 76%,rgba(213,201,179,1) 98%,rgba(213,201,179,1) 100%,rgba(240,240,240,1) 100%,rgba(240,240,240,1) 100%);
				.image {

					margin-left: 1.375rem;
					margin-bottom: 5%;
					@include gy('5%', '', '', 1.3125rem, 1.3125rem);

				}

				text {
					margin: 5% 0 0 1.375rem;
				}
			}

			.box5 {
				color: #666666;
				box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.3);
				@include gy(1rem, 15px, align-center, 90.6%, 4.6875rem);
		background: -webkit-linear-gradient(-45deg, rgba(180,164,140,1) 44%,rgba(218,206,183,1) 75%,rgba(218,206,183,1) 75%,rgba(224,213,193,1) 81%,rgba(224,213,193,1) 81%,rgba(234,225,204,1) 99%);
				text {
					margin: 5% 0 0 1.375rem;
				}

				.image {

					margin-left: 1.375rem;
					margin-bottom: 5%;
					@include gy('5%', '', '', 1rem, 1rem);

				}

			}
		}

	}
</style>
