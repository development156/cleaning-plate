<template>

	<view>
		<view class="xTab">
			<xTab :value="tabList" @changeTab="changeTab" actType="underline" :config="{padding:150,spacing: 150,background:'white',color:'#666666',actColor:'#C9A65E',actSize:40,size:40,position:0}"></xTab>
		</view>

		<!-- :url="`/pages/details/index?id=${item.target}`" -->
		<!-- 开始循环遍历 -->

		<!-- 	积分兑换 -->

		<view class="hot_goods" v-if="flag==1">
			<view class="tit" style="color:#C9A65E ;">
			<view style="height:1.25rem; width: 0.1875rem; background: #C9A65E; margin-top: 3%; margin-right: 2%;"></view>
			<view>我的积分{{myInfo.integrate}}</view>
			</view>
			<view class="goods_list">
				<navigator class="goods_item" v-for="(item,index) in goodsList" :key="index" :url="'goodsDetails/creditDetails?item='+ encodeURIComponent(JSON.stringify(item))">
					<image :src="item.url" open-type="redirect">
					</image>
					<view class="name">
						<text style="color: white; background-color:#C9A65E ;width: 15px;height: 0.75rem;border-radius:0.125rem" >扶农助农</text>
						<text style="margin-left: 2%;color: gray;">   {{item.name}}</text>
					</view>
					<view class="name">
						<text style="color:#C9A65E ;">扶贫单位</text>
						<text style="color: gray;margin-left: 3%">{{item.povertyAlleviationUnit}}</text>
					</view>
					<view class="price">
						<text style="color: red;">{{item.integrate}}积分</text>
						<text> 已售{{item.sales}}</text>
					</view>

				</navigator>
			</view>
		</view>

		<!-- 商城 -->
		<view v-else>
			<uni-search-bar placeholder="搜索" @confirm="search" @cancel="cancel()" :radius="100"></uni-search-bar>
			<navigator class="news_item" v-for="(item,index) in shopList" :url="'goodsDetails/payDetails?item='+ encodeURIComponent(JSON.stringify(item))"
			 :key="item.id" open-type="redirect">
				<image :src="item.url"></image>
				<view class="right" style="color: gray;">
					<view class="tit" style="color:#C9A65E ">
						<text>【扶农助农】</text>
						{{item.name}}
					</view>
					<text>扶贫单位 {{item.povertyAlleviationUnit}}</text>
					<text>￥{{item.univalence}}</text>
					
				
					

				</view>
			</navigator>
		</view>
	</view>


</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import uniSearchBar from '@/components/common/uni-search-bar/uni-search-bar.vue'
	import xTab from '@/components/common/poiuy-xTab/xTab.vue';
	import {
		getGoodlist
	} from '../../../models/exchangezone/creditsExchange/goodsList.js'
	import {
		swiperList
	} from '../../../models/exchangezone/creditsExchange/swiperList.js'
	import {
		search
	} from '../../../models/exchangezone/search/search.js'
	const getgoodlist = new getGoodlist()
	const SwiperList = new swiperList
	const Search = new search()
	export default {
		components: {
			xTab,
			uniSearchBar
		},
		computed: {
			...mapGetters([
				'userInfo', 'myInfo'
			])
		},
		data() {
			return {
				goodsList: [],
				// 商城里的商品列表
				shopList: [],
				// 判断是否是支付还是积分的标志
				flag: 1,
				// 分页的相应参数
				pageNum1: 1,
				pageNum2: 1,
				// 是否还有更多数据
				hasMore1: true,
				hasMore2: true,
				tabList: [{
						name: '兑换',
						id: 0
					},
					{
						name: '商城',
						id: 1
					},

				],
			}
		},
		onLoad() {
			this.getScoll();
			

		},
		//滚动条触底事件
		onReachBottom() {
			console.log("啦啦啦");
			if ((this.hasMore1 && this.flag == 1) || (this.hasMore2 && this.flag == 2)) {
				this.getScoll();
			} else {
				uni.showToast({
					title: '没有数据啦！',
					icon: "none"
				});
			}
		},

		methods: {
			// 获取商品的分页数据
			getScoll() {
				console.log(this.pageNum2);
				getgoodlist.getGoodList(this.flag, this.pageNum = ((this.flag == 1) ? this.pageNum1 : this.pageNum2)).then(res => {
					console.log("打印结果")
					console.log(res.data);
					console.log(this.pageNum2);

					if (this.flag == 1 && this.hasMore1 == true) {
						this.goodsList = [...this.goodsList, ...res.data];
						console.log(this.goodsList);
					}
					if (this.flag == 2 && this.hasMore2 == true) {
						this.shopList = [...this.shopList, ...res.data]
						console.log("存入结果")
						console.log(this.shopList);
					}

					if (res.data.length < 8 && this.flag == 1) {
						this.hasMore1 = false;
						uni.showToast({
							title: '没有更多数据了！',
							icon: "none"
						});
						return;
					}
					if (res.data.length < 8 && this.flag == 2) {
						this.hasMore2 = false;
						uni.showToast({
							title: '没有更多数据了！',
							icon: "none"
						});
						return;
					}
					if (res.data.length == 8 && this.flag == 1) {
						this.pageNum1++;
					}
					if (res.data.length == 8 && this.flag == 2) {
						this.pageNum2++;
					}

				}).catch(error => {
					console.log("获取数据失败")
				})
			},
			// 监听切换
			changeTab(e) {
				// console.log(e);
				this.swiperCurrIndex = e.index;
				this.flag = e.index + 1;
				console.log(this.pageNum1)

				if (this.hasMore1 || this.hasMore2) {
					this.getScoll()
				}

			},

			// 搜索
			search(e) {
				console.log(e.value)
				Search.doSearch(e.value).then(res => {
					this.shopList = res.data
				})
			},
			// 取消搜索
			cancel(e) {
				console.log(e)
				this.getScoll();
			}
		}
	}
</script>

<style>
	page {
		background-color: #F5F5F5;
	}
</style>
<style lang="scss" scoped>
	page {
		
		.xTab {
			height: 3.625rem;
			background-color: white;
		}

		.hot_goods {
			overflow: hidden;
			margin-top: 10px;
			font-size: 35rpx;
			.tit {
				height: 35px;
				width: 100%;
				display: flex;
				border-radius: 0.5rem;
				line-height: 40px;
				text-align: left;
				color: white;
				padding-left: 5%;
				// 字间距
				letter-spacing: 2px;
		
			}
		}

		.goods_list {
			display: flex;
			flex-wrap: wrap;
			padding: 0 10rpx;
			justify-content: space-between;
			width: 95%;
			margin: 0 auto;
			
			.goods_item {
				background: #fff;
				width: 49%;
				margin-top: 10px;
				flex-direction: column;
				
				padding: 20rpx;
				box-sizing: border-box;
				border-radius: 10px;

				image {
					width: 90%;
					height: 130px;
					display: block;
					margin: 0 auto;
					border-radius: 10px;
				}

				.price {
					color: red;
					font-size: 30rpx;
					display: flex;
					justify-content: space-between;
				}

				.name {
					font-size: 32rpx;
					line-height: 50rpx;
					padding-bottom: 15rpx;
					padding-top: 10rpx;
					
				}
			}
		}
	}

	// 商城

	.news_item {
		font-size: 30rpx;
		height: 7.3125rem;
		display: flex;
		border-radius: 5px;
		margin: 1.0625rem 0.5rem 0px 0.5rem;
		padding: 10rpx 20rpx;
		box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.1);
		background-color: white;
		border: 1px solid rgba(255, 255, 255, 100);

		image {
			height: 90%;
			min-width: 7.5rem;
			max-width: 7.5rem;
			height: 100%;
			border-radius: 10px;
		}

		.right {
			margin-left: 15rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;


			text:nth-child(3) {
				color: red;
			}


		}

	}
</style>
