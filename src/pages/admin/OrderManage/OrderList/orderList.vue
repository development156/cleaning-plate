<template>
	<view class="container">
		<view class="head-color"></view>
		<view class="plat">
		<p v-if="hasend">等待买家收货</p>
		<p v-else >等待发货</p>
		<view style="width: 628rpx; opacity: 0.48; margin: 0 auto; border: 1rpx solid rgba(187, 187, 187, 100);"></view>
		<view v-if="hasend">
		<p  >快件由【山西太原转运中心】发往【山西长治公司】</p>
		<span>2021-01-13  01：00：37</span>
		</view>
		<p v-else  style="font-size: 14px; color: rgba(119, 118, 114, 100); "> 请您及时发货并填写发货单号</p>
		
		</view>
		
		<view class="purchase-info">
			<view class="font1" style="font-size: 32rpx;color: rgba(16, 16, 16, 100); margin: 16rpx 0 32rpx 74rpx;">柚见食光</view>
				<view style=" display: flex; flex-direction: row;">
					<!-- style="margin-top: 30rpx;" -->
			    
			        <image style="box-shadow:2rpx 1rpx 1rpx  #000000; margin-left: 50rpx; width: 180rpx; height: 180rpx; background-color: #eeeeee;border-radius: 10px;" mode="aspectFit" src='"http://8.131.230.3:8080/YouGuang_war"+item.url'
			            @error="imageError"></image>
			    
			    <view class="image-title" style="font-size: 32rpx;
				flex-wrap: wrap; font-size: 32rpx;margin-left: 20rpx;
				width: 390rpx;
				">到事的接口·字</view>
				<view style="float: right;color: rgba(119, 118, 114, 100);
				font-size: 14px;">¥19.9</view>
				</view>
				<view style="
				margin:auto ;
				margin-top: 34rpx;
			    text-align: center;
				width: 678rpx;
				border: 1rpx solid rgba(187,187,187, 0.2);"></view>
			<view class="tab1">
			<p>商品总价</p>
			<p>¥19.9</p>
			</view>
			<view class="tab2">
			<p>运费</p>
			<p>¥0</p>
			</view>
			<view class="tab3">
			<p>实收款</p>
			<p>¥19.9</p>
			</view>
			
			<view class="address">
				<span>收货地址：<span>小王  13913991399</span> </span>
				<view>四川省南充市88车内男女你当初踩踩踩踩踩踩踩踩踩踩踩踩嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩油院路30号西南石油大学</view>
			</view>
			<view class="order-infmation">
				<view class="title">订单信息 </view>
				<view>买家昵称：<span>92722523215</span></view>
				<view>订单编号：<span>哈哈哈哈</span></view>
				<view>下单时间：<span>2021-01-12  23：14：40</span></view>
				
			</view>
			
			<view v-if="hasend" class="order-btn">
				 <view class="btn change-info">修改物流</view>
				 <view class="btn remind-user">提醒收货</view>
			</view>
			<view v-else class="order-btn">
				 <view class="btn change-info">取消订单</view>
				 <view class="btn remind-user">去发货</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				hasend:false,//判断是否发货了
				
			}
		},
		methods: {
		       imageError: function(e) {
		           console.error('image发生error事件，携带值为' + e.detail.errMsg)
		       },
	},
	}
</script>

<style scoped lang="scss">
	page{
		
		.container{
		display: flex;
		vertical-align: center;
		justify-content: center ;
	.head-color{
		width: 754rpx;
		height: 230rpx;
		line-height: 40rpx;
		background-color: rgba(201, 166, 94, 100);
		text-align: center;
		border: 2rpx solid rgba(187, 187, 187, 100);
	}
	.plat{
		
		// box-shadow:0 3px 5px #000000;
		box-shadow:0px 2rpx 2rpx  #000000;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 120rpx;
		
		width: 694rpx;
		height: 216rpx;
		line-height: 40rpx;
		border-radius: 40rpx;
		
		border: 2rpx solid rgba(255, 255, 255, 100);
		p:nth-child(1) {
			color: rgba(16, 16, 16, 100);
			font-size: 36rpx;
			font-weight: 600;
			margin-left: 32rpx;
			margin-top: 36rpx;
			margin-bottom: 16rpx;
			
		}
		p:nth-child(3) {
			color: rgba(14, 172, 226, 100);
			font-size: 24rpx;
			height: 28rpx;
			margin-top: 20rpx;
			margin-bottom: 6rpx ;
			margin-left: 34rpx;
		}
		span{
			color: rgba(119, 118, 114, 100);
			font-size: 24rpx;
			text-align: left;
			margin-left: 34rpx;
		}
	}
	.purchase-info{
		height: 496rpx;
		margin-left: -8rpx;
		width: 750rpx;
		position:absolute;
		margin-top:280rpx;
		
		background: #FFFFFF;
	
	}
	.tab1,.tab2,.tab3{
		display: flex;
		flex-direction: row;
		flex-flow: row nowrap;
		justify-content: space-between;
		margin-left:38rpx ;
		margin-right:36rpx ;
		
	}
	.tab1{
		margin: 20rpx 36rpx 8rpx 38rpx;
		p{
			color: rgba(119, 118, 114, 100);
			font-size: 14px;
		}
	}
	.tab2{
		margin-bottom:20rpx;
		p{
			color: rgba(119, 118, 114, 100);
			font-size: 14px;
		}
	}
	.tab3{
		
		p:nth-child(1){
			color: rgba(16, 16, 16, 100);
			font-size: 16px;
			font-weight: 600;
		}
		p:nth-child(2){
			color: rgba(201, 166, 94, 100);
			font-size: 16px;
		}
	}
	.address{
		height: 112rpx;
		padding: 34rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 32rpx;
		background-color: #FFFFFF;
		margin:32rpx 0 22rpx 0;
		
		view{
			overflow-y: scroll;
			margin-top: 20rpx;
			color: rgba(119, 118, 114, 100);
			font-size: 24rpx;
			height: 60rpx;
		}
	}
	.order-infmation{
		
		background: #FFFFFF;
		height: 430rpx;
		overflow: hidden;
		.title{
			// position: relative;
			margin-left: 36rpx;
			padding-top: 30rpx;
			color: rgba(16, 16, 16, 100);
			font-size: 32rpx;
		}
		view:nth-child(2){
			// position: relative;
			margin-top: 40rpx;
			
		}
		view:nth-child(2),view:nth-child(3),view:nth-child(4){
			margin-left: 36rpx;
			color: rgba(119, 118, 114, 100);
			font-size: 24rpx;
			line-height: 50rpx;
		}
	}
	.order-btn{
		z-index: 999;
		
		height: 108rpx;
		background: #FFFFFF;
		display: flex;
		justify-content: space-around; 
		flex-direction: row;
	
		
		.btn{
			width: 332rpx;
			height: 84rpx;
			font-size: 32rpx;
			text-align: center;
			line-height: 84rpx;
			border-radius: 20px;
			border: 2rpx solid rgba(187, 187, 187, 100);
		}
		.change-info{
			background: #FFFFFF;
		
		}
		.remind-user{
			background-color: rgba(201, 166, 94, 100);
			color: #FFFFFF;
		}
	}
	
	}
}
</style>
