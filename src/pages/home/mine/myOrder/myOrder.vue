<template>
		<view>
			<!--顶部导航栏-->
			<view class="uni-tab-bar">
			<xTab :value="tabBars" @changeTab="changeTab" actType="underline" :config="{height: 150,height1: 40,left:200,color:'#666666',actColor:'#C9A65E',size:32,position:0}" class="uni-swiper-tab"></xTab>
			
			<!--内容区-->
			
				<swiper  :current="swiperCurrIndex" @change="swiperChange" :style="{height:swiperHegiht}">
					<swiper-item v-for="(content,index) in contentList" :key="index"  >
						<!-- <view class="swiper-item">{{content}}</view> -->
					<view :id="'swiper_id_'+index">
					<view class="content" >
						<view class="item1">
								<text>柚见时光</text>
								<text>订单已完成</text>
						</view>
							<view class="item2" @click="navTo">
								<image>
									
								</image>
								<text>海南网纹瓜 玫珑瓜蜜瓜哈密瓜 新鲜水果</text>
								<text>￥19.9</text>
							</view>
							<view class="item3">再次购买</view>
					</view>	
					<view class="content">
						<view class="item1">
								<text>柚见时光</text>
								<text>订单已完成</text>
						</view>
							<view class="item2">
								<image>
									
								</image>
								<text>海南网纹瓜 玫珑瓜蜜瓜哈密瓜 新鲜水果</text>
								<text>￥19.9</text>
							</view>
							<view class="item3">再次购买</view>
					</view>	
					<view class="content">
						<view class="item1">
								<text>柚见时光</text>
								<text>订单已完成</text>
						</view>
							<view class="item2">
								<image>
									
								</image>
								<text>海南网纹瓜 玫珑瓜蜜瓜哈密瓜 新鲜水果</text>
								<text>￥19.9</text>
							</view>
							<view class="item3">再次购买</view>
					</view>	
					
					
					</view>
					</swiper-item>
				</swiper>
			
			
			
			
			<!-- <view class="uni-tab-bar">
						<scroll-view scroll-x class="uni-swiper-tab">
							<block v-for="(tabBar,index) in tabBars" :key="index">
								<view class="swiper-tab-list" :class="{'active': tabIndex==index}" @tap="toggleTab(index)">
									{{tabBar.name}}
									<view class="swiper-tab-line">
									</view>
								</view>
							</block>
						</scroll-view>
						
		</view> -->
		
			</view>
			
		</view>
</template>
<script>
	  import xTab from '@/components/common/poiuy-xTab/xTab.vue';
	export default {
		
			data() {
				return {
				
					contentList: [
									"关注",
									"推荐",
									"热点",
									"体育",
									'财经',
									'娱乐',
								 ],
					tabBars:[
						{
							name: '全部',
							id: 1
						},
						{
							name: '待付款',
							id: 2
						},
						{
							name: '待发货',
							id: 3
						},
						{
							name: '已完成',
							id: 4
						},
						{
							name: '已取消',
							id: 5
						}
						
					],
				
				//swiper当前位置
				swiperCurrIndex:0,
				//swiper动态高度
				swiperHegiht:300, 
				}
			},
			components: {
				xTab
			},
			onLoad() {
				
		// 获取动态高度
			 this.setSwiperHeight();
			},
			methods: {
				
				changeTab(e){
				                 console.log(e);
				                 this.swiperCurrIndex = e.index;
								
				             },
				//swiper组件的切换返回值（执行其他的方法只需要在这里执行即可。）
				            swiperChange(e) {
				                this.swiperCurrIndex = e.detail.current;
				                this.setSwiperHeight(); //例如动态获取高
				            },
				 //动态设置swiper高度
				            setSwiperHeight() {
				                const that = this;
				                let obj = uni.createSelectorQuery().in(this).select("#swiper_id_" + (this.swiperCurrIndex));
				                obj.boundingClientRect(function(data) { //data - 各种参数
				                    if (data) {
				//得到px单位的高度，通过px转换rpx的单位换算(加上底部的间距或者存在底部按钮高度合成最后的rpx高度)
				                        that.swiperHegiht = data.height * 2 + 110; 
				                    }
				                }).exec();
				            },
				
				
				// toggleTab(index){
				// 	console.log(index)
				// 	this.tabIndex = index
				// },
				//滑动切换swiper
				// tabChange(e){
				// 	console.log(e.detail)
				// 	const tabIndex = e.detail.current
				// 	this.tabIndex = tabIndex
					
				// },
				//    getElementHeight() {
					   
				//                 uni.getSystemInfo({
				//                 				success: (res) => {
				//                 					// uni-app 提供了 upx2px 方法，将对应的 rpx 值转换成了 px
				//                 					let height = res.windowHeight - uni.upx2px(100)
				//                 					this.swiperHeight = height+1000; // 让data中定义的swiperheight高度等于计算过后的高度
				//                 					console.log(this.swiperHeight)
				//                 				}
				//                 			});
				//             },
				navTo(){
					uni.navigateTo({
					url:'orderDetails/orderDetails'
					})
				}
			}
		}
	</script>
	
	<style lang="scss">
		.tab-view{
			margin-top: 3.125rem;
			
		}
		  swiper {
		            min-height: 200vh;
		        }
		
		
	page{
		background-color: #3B5A69;
	}
	
		.uni-swiper-tab{
			border-bottom: 1upx solid #eeeeee;
			background-color: #ffffff;
			
		}
	
		
				.content{
						
						
						background-color: #FFFFFF;
						border-radius: 5px;
						text-align: center;
						border: 1px solid rgba(255, 255, 255, 100);
						margin-top: 0.875rem;
						.item1{
						display: flex;
						margin:1.3125rem  1.5625rem 1.1875rem 1.5625rem;
						justify-content: space-between;
						text{
							&:nth-child(1) {
								font-size: 0.875rem;
							}
							&:nth-child(2) {
								font-size: 0.75rem;
								color: #C9A65E;
							}
						}
					}
					.item2{
						display: flex;
						justify-content: space-around;
						image{
							width: 5.5rem;
							height: 5.5rem;
							border: 1px solid gray;
							margin: 1.1875rem 0 0 1.4375rem; 
							border-radius: 10px;
						}
						text{
							
							&:nth-child(2) {
								margin: 42px 0 0 0.625rem;
								font-size: 0.75rem;
								text-align: left;
								width: 9.5625rem;
							}
							&:nth-child(3) {
								margin: 3.4375rem 1.5625rem 0 1.625rem;
								color: #C9A65E;
							}
						}
					}
					.item3{
						width: 4.6875rem;
						height: 1.5625rem;
						opacity: 0.63;
						border-radius: 15px;
						text-align: center;
						border: 1px solid rgba(187, 187, 187, 100);
						font-size: 0.8125rem;
						margin: 1.25rem 1.375rem 1.125rem 14.375rem;
					}
					}
			
		
	
</style>
