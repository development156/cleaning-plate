<template>
	<view class="content" >
		<view class="bg">
			<swiper class="swiper" previous-margin="54rpx" next-margin="54rpx" :indicator-dots="indicatorDots" @change="change" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular">
			  <swiper-item v-for="(itt,idx) in item" :key="idx" @click="navTo(itt)">
			<hm-cover-card  :options="itt"  :index="index==idx?true:false" :idx="idx"></hm-cover-card>
			 </swiper-item>
			  </swiper>
		
		</view>
	</view>
</template>

<script>
	import HmCoverCard from '@/components/common/yang-cover-card/index.vue'
	import {FoodShow} from '../../../models/foodShow/foodShow.js'
	const foodShow = new FoodShow()
	export default {
		components: { HmCoverCard },
		data() {
			return {
				title: 'Hello',
				indicatorDots: false,
				autoplay: false,
				interval: 2000,
				duration: 500,
				circular: false,
				item:[],
				index:0,
				
			}
		},
		async onShow() {
			this.item = [];
			this.init();
		},
		onPullDownRefresh() { 
			this.item = [];
		  setTimeout(() => {
		  this.init();   
		    uni.hideNavigationBarLoading();
		    // 停止下拉动作
		    uni.stopPullDownRefresh();
		  }, 1000);
		},
		methods: {
			change(e){
				console.log(e)
				this.index = e.detail.current
				//this.init();
			},
			async init(){
				uni.showLoading({
					title:'加载中...'
				})
				uni.hideLoading();
				
				// 获取食堂名称
				
					foodShow.getCanteenName().then(res=>{
						this.item = res.data
						for(var i=0;i<res.data.length;i++){
							this.item[i]={
								title:res.data[i],
								id:i,
								type:0,
								text:"lallll"
							}
					}
					console.log(this.item)
				})
				
			},
			navTo(itt){
				const item = itt.title
				uni.navigateTo({
				url:'./foodShow?item='+ encodeURIComponent(JSON.stringify(item))
				})
			}
			
		}
	}
</script>

<style lang="less">
	.content {
		width: 100%;
		height: calc(100vh);
		position: relative;

		.bg {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: calc(100vh);
			box-sizing: border-box;
			flex-direction: column;
			.swiper{
				width: 100%;height: 100%;
				
				swiper-item{
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					width: 100%;
					height: 100%;
					box-sizing: border-box;
					flex-direction: column;
				}
			}
		

		

			

		}

	}
</style>
