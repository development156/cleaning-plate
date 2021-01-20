<template>
	<view >
		
		<taHeadBar @state="jugement($event)"></taHeadBar>
		
		<view class="item-list">
		        <view class="image-item" v-for="(item,index) in array" :key="index">
					
					
					<view class="first-line">
				<view class="user-info">
					
					<image style=" width: 48rpx; height:48rpx; background-color: #eeeeee;border-radius: 48rpx;" mode="aspectFit" src='"http://8.131.230.3:8080/YouGuang_war"+item.url'
		                    @error="imageError"></image>
					<span>我的昵称</span>
				</view>
				<view class="order-state">
					等待<span v-show="tackled">买家收货</span><span v-show="!tackled">发货</span>
				</view>
					</view>
					<view style="margin-top: 30rpx;">
		            <view class="image-content">
		                <image style="width: 156rpx; height: 158rpx; background-color: #eeeeee;border-radius: 10px;" mode="aspectFit" :src='"http://8.131.230.3:8080/YouGuang_war"+item.url'
		                    @error="imageError"></image>
		            </view>
		            <view class="image-title">{{item.description}}</view>
					</view>
					<span>{{item.data}}</span>
					<view style="margin-right: 25rpx; font-size: 24rpx;float: right;">使用积分：
					<span style="height: 21px;width: 50px; color: rgba(201, 166, 94, 100);">{{item.integrate}} </span>
					<span v-if="item.exchangeway">(积分兑换)</span>
					</view>
					<view  v-if="!tackled" class="btn" @click="dipach">去发货</view>
					<view  v-else  class="btn">收获提醒</view>
				</view>
				<view v-if="have" class="have"> 暂无兑换历史 快去兑换吧</view>
		    </view>		
			
			<view>
					<tabBar :pagePath="'OrderManage/index'"></tabBar>
			 </view>
	</view>
</template>

<script>
	import { OrderManager } from '@/models/admin/OrderMangae/orderManager.js'
	const orderMangae = new OrderManager();
	
	
	import taHeadBar from './tabbar.vue'
	export default{
		// name:'OrderManager',
		data(){
			return{
			tackled:false,
			array: [{
			   "studentId": "1",
			   "date": "2020",
			   "url": "",
			   "integrate": 8,
			   "id": 7,
			   "pname": null,
			   "pid": null,
				'description':'hu弄哭了你看来你可能就可能就vvvvvvvvvvvvvvvvvvvvvvvvv',
				"exchangeway":true  //判断是不是积分兑换
			},{
			   "studentId": "2",
			   "date": "2020",
			   "url": "",
			   "integrate": 8,
			   "id": 7,
			   "pname": null,
			   "pid": null,
				'description':'hu弄哭了你看来你可能就可能就vvvvvvvvvvvvvvvvvvvvvvvvv',
				"exchangeway":false
			}  ],
			}
		},
		components:{
			taHeadBar
		},
		created() {
			this.gotAllGoods();
		},
		methods:{
			imageError: function(e) {
			    console.error('image发生error事件，携带值为' + e.detail.errMsg)
			},
			dipach: function(e){
				   uni.navigateTo({
				     url:"./dispachList"
				})
			},
			jugement: function(state){
				console.log("--");
				if(state==1){
					this.tackled=false;
				}else{
					this.tackled=true;
				}
			},
			gotAllGoods:function(
			
			){
							orderMangae.getAllGoods().then(res => {
						console.log(res)
						// this.array=res.data
							console.log(JSON.parse(res.data));
					    uni.showToast({
					    	    title: '操作成功',
					    	    duration: 1500
					    	});	
					})
					.catch(err => {
							console.log("err")
						console.log(err)
							uni.showModal({
												content: err,
												showCancel: false
										});
							console.log("err")	
				})	
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		height: 100%;
		display: flex;
		
		justify-content: center;
		background-color:  rgba(244, 243, 243, 100);
		border-radius: 10rpx;
		border: 2rpx solid rgba(255, 255, 255, 100);
	
	.item-list{
		width: 704rpx;
		margin: 0 auto;
		height: 434rpx;
		margin-top: 61rpx;
		.have{
			margin-top: 30rpx;
			color: 	#A9A9A9;
			font-size: 40rpx;
			text-align: center;
		}
		.image-item{
		
		height: 434rpx;
		// width: 704rpx;
		margin-bottom: 25rpx;
		border: 2rpx solid rgba(255, 255, 255, 100);
		border-radius: 20rpx;
		background-color:#FFFFFF;
		.image-content{
			   align-items: center; 
			// top: 10%; /*偏移*/
			float: left;
			margin-left: 44rpx;
			margin-top: 0rpx;
		}
		.image-title{
			
			flex-wrap: wrap; 
			position: relative;	
		    left: 40rpx;
			top: 10rpx;
			width: 600rpx;
			height: 150rpx;
			color: rgba(16, 16, 16, 100);
			font-size: 28rpx;
		}
		.first-line{
			display: flex;
			flex-direction: row nowrap;
			justify-content: space-between;
			margin-top: 24rpx;
			.user-info{
				
				margin-left: 22rpx;
				
				span{
					border:0 ;
					margin-left: 26rpx;
					display: inline-block;
					color: rgba(16, 16, 16, 100);
					font-size: 14px;
				}
			}
			.order-state{
				text-align: right;
				margin-right: 22rpx;
				width: 182rpx;
				height: 34rpx;
				color: rgba(201, 166, 94, 100);
				font-size: 28rpx;
			}
			
		}

		
		}
		.btn{
			position: relative;
			width: 180rpx;
			height: 64rpx;
			line-height:30rpx;
			border-radius: 40rpx;
			text-align: center;
			border: 2rpx solid rgba(187, 187, 187, 100);
			font-size: 28rpx;
			// float: right;
			top:70rpx;
			left: 495rpx;
			font-family: PingFangSC-regular;
		}
	}
	
	}
</style>
