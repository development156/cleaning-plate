<template>
	<view class="mine-container">
		<view class="header">
			<view>208</view>
		</view>
		<view class="main">
			<view class="info">本月获得<span style="color: rgba(243, 227, 178, 100);
"> 82</span> 使用<span style="color: rgba(243, 227, 178, 100);"> -199</span></view>
	
			<view class="item-list">
		            <view class="image-item" v-for="(item,index) in array" :key="index">
					<view class="font1">	柚光自营＞ <span class="font2">已完成</span></view>
						<view style="margin-top: 30rpx;">
		                <view class="image-content">
		                    <image style="width: 180rpx; height: 180rpx; background-color: #eeeeee;border-radius: 10px;" mode="aspectFit" :src='"http://8.131.230.3:8080/YouGuang_war"+item.url'
		                        @error="imageError"></image>
		                </view>
		                <view class="image-title">{{item.description}}</view>
						</view>
						<span>{{item.data}}</span>
						<view style="color: rgba(16, 16, 16, 100);margin-top: 80rpx;margin-right: 20rpx; font-size: 28rpx;float: right;">使用积分：{{item.integrate}}</view>
		            </view>
					<view v-if="have" class="have"> 暂无兑换历史 快去兑换吧</view>
		        </view>		
			</view>
	
	</view>
</template>

<script>
	import { MyModel } from '@/models/MyModel/exchangeHistory.js'
	const myModel = new MyModel();
	
	export default{
		data() {
		        return {
					have:false,
		            array: [{
		               "studentId": "1",
		               "date": "2020",
		               "url": "wwww",
		               "integrate": 8,
		               "id": 7,
		               "pname": null,
		               "pid": null,
						'description':''
		            } ],
		
		}
		},
		 methods: {
		        imageError: function(e) {
		            console.error('image发生error事件，携带值为' + e.detail.errMsg)
		        },
				getData(){
					uni.showLoading({
						title: '正在加载...'
					})
					myModel.convertHistory(2).then(res => {
							console.log(res)
							this.array=res.data
							uni.hideLoading()
							uni.stopPullDownRefresh()
							if(res.data.length==0){
								this.have=true
							}
						})
						.catch(err => {
							console.log(err)
							uni.hideLoading()
							uni.stopPullDownRefresh()
						})	
				}
			},
		created() {
			this.getData();
		}
	}
</script>

<style  lang="scss" scoped>
	page{ 	
		background-color: rgba(119, 92, 76, 100);; 
		height: 100%;
		display: flex;
	    vertical-align :middle;
		p.serif{font-family:"Times New Roman",Times,serif;}
		//拆行
	.mine-container { 
		height: 100%;
		
		.header{
			position: absolute;
			left: 36rpx;
			top: 18rpx;
			width: 140rpx;
			height: 82rpx;
			color: #F3E3B2;
			font-size: 72rpx;
			text-align: left;
			
			
		}
		.main{
			left: 36rpx;
			top: 168rpx;
			width: 678rpx;
			height: 100%;
			background-color:  rgba(244, 243, 243, 100);
			line-height: 40rpx;
			border-radius: 20rpx;
			border: 2rpx solid rgba(255, 255, 255, 100);
			position:absolute;
			.info{
				position:absolute;
				left: 20rpx;
				top: 42rpx;
				// width: 04rpx;
				height: 34rpx;
				color: rgba(16, 16, 16, 100);
				font-size: 28rpx;
				text-align: left;
			}
			.item-list{
				position:absolute;
				top: 114rpx;
				.have{
					margin-top: 30rpx;
					color: 	#A9A9A9;
					font-size: 40rpx;
					text-align: center;
				}
				.image-item{
				
				height: 370rpx;
				width: 678rpx;
				margin-bottom: 5rpx;
				border: 2rpx solid rgba(255, 255, 255, 100);
				border-radius: 20rpx;
				background-color:#FFFFFF;
				.image-content{
					
					   align-items: center; 
					// top: 10%; /*偏移*/
					float: left;
					margin-left: 35rpx;
					margin-top: 9rpx;
				}
				.image-title{
					
					flex-wrap: wrap; 
					position: relative;	
				    left: 40rpx;
					top: 20rpx;
					width: 600rpx;
					height: 150rpx;
					color: rgba(16, 16, 16, 100);
					font-size:  26rpx;
					
					
				}
				.font1{
					margin-left: 30rpx;
					margin-top: 30rpx;
					
					height: 34rpx;
					color: rgba(16, 16, 16, 100);
					font-size: 30rpx;
					text-align: left;
					
					.font2{
						  float:right;
						  margin-right: 20rpx;
						  top: 448rpx;
						  width: 90rpx;
						  
						  color: rgba(149, 149, 149, 100);
						  font-size: 30rpx;
						  text-align: left;
						  
					}
				}
				
				}
			}
			
			}
	
	
		}
		
		
		}
</style>
