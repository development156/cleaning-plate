<template>
	<view class="container">
		<view class="head-color"></view>
		<view class="plat">
		<p v-if="hasTackled">等待买家收货</p>
		<p v-else >等待发货</p>
		<view style="width: 628rpx; opacity: 0.48; margin: 0 auto; border: 1rpx solid rgba(187, 187, 187, 100);"></view>
		<view v-if="hasTackled" style="height: 160rpx; overflow-y: scroll;">
		<p style="margin: 15rpx;  font-size: 30rpx;color: rgba(14, 172, 226, 100);" >
			快件已发往【西南石油】</p>
		<span>{{shipmentDate}}</span>
		</view>
		<p v-else  style="font-size: 14px; color: rgba(119, 118, 114, 100); "> 请您及时发货并填写发货单号</p>
		
		</view>
		
		<view class="purchase-info">
			<view class="font1" style="font-size: 32rpx;color: rgba(16, 16, 16, 100); margin: 16rpx 0 32rpx 74rpx;">柚见食光</view>
				
				<view style="height: 40%; overflow-y: scroll;">
				<view  v-for="(item , index) in commodityList" :key="item.id"
				 style=" display: flex; flex-direction: row; margin-bottom: 20rpx; ">
					<!-- style="margin-top: 30rpx;" -->
			    
			       <image style="box-shadow:2rpx 1rpx 1rpx  #000000; margin-left: 50rpx; 
					width: 180rpx; height: 180rpx; background-color: #eeeeee;border-radius: 10px;" mode="aspectFill" :src="imgurl+url"
			            @error="imageError"></image>
			   
			    <view class="image-title" style="font-size: 32rpx;
				flex-wrap: wrap; font-size: 32rpx;margin-left: 20rpx;
				width: 390rpx;
				">{{item.name}}</view>
				<view v-if="flag==0" style="float: right;color: rgba(119, 118, 114, 100);
				font-size: 14px;">{{item.univalence}}*{{item.number}}</view>
				<view v-if="flag==1" style="float: right;color: rgba(119, 118, 114, 100);
				font-size: 14px;">{{item.integrate}}*{{item.number}}</view>
				</view>
			
				</view>
				<view style="
				margin:auto ;
				margin-top: 34rpx;
			    text-align: center;
				width: 678rpx;
				border: 1rpx solid rgba(187,187,187, 0.2);"></view>
			<view class="tab1">
			<p>商品总价</p>
			
			<p v-if="flag==0">{{Money}}</p>
			<p v-else >{{integrate}}</p>
			</view>
			<view class="tab2">
			<p>运费</p>
			<p>¥0</p>
			</view>
			<view class="tab3">
			<p>实收款</p>
			<p v-if="flag==0">{{Money}}</p>
			<p v-else >{{integrate}}</p>
			</view>
			
			<view class="address">
				<span>收货地址：<span>{{userName}}&emsp;  {{contactWay}}</span> </span>
				<view>{{shippingAdress}}</view>
			</view>
			<view class="order-infmation">
				<view class="title">订单信息 </view>
				<view>买家昵称：<span>{{userName}}</span></view>
				<view>订单编号：<span>{{orderId}}</span></view>
				<view>下单时间：<span>{{date}}</span></view>
				
			</view>
			
			<!-- <view v-if="hasTackled" class="order-btn"> -->
				 <!-- <view class="btn change-info">#^ ^#</view><!-- //修改物流 --> 
				 <!-- 1表示管理员确定订单，也是可以通知的！2表示管理员提醒用户自取 -->
		<!-- 		 <view class="btn remind-user"   @click="ensureShipment(2)">提醒收货</view>
			</view> -->
			
			<!-- <view  class="order-btn"> -->
				 <!-- <view v-if="hasTackled" class="btn change-info">取消订单</view> -->
			<!-- 	 <view  class="btn remind-user" @click="ensureShipment(1)">去发货</view>
			</view> -->
		</view>
		
	</view>
</template>

<script>
	import { OrderManager } from '@/models/admin/OrderMangae/orderManager.js'
	const orderMangae = new OrderManager();
	
	export default{
		data(){
			return{
				flag:'',
				imgurl:'',
				url:'',
				// hasend:false,//判断是否发货了
				orderId:'',
				userName:'',
				date:'',//创建时间
				contactWay:'',//联系方式
				shipmentDate:'',//配送时间
				Money:'',
				shippingAdress:'',
				commodityList:[],
				integration:'',//扣除积分
				// hasTackled:false,//管理员已经处理
			}
		},
		onLoad(options) {
		
				this.imgurl = this.imgUrl;
				this.orderId=options.ID;
			this.flag=options.flag;
			// this.hasTackled=options.hasTackled;
			// console.log(options.hasTackled)
			this.getApplyInformation(this.orderId);
			
			
		},
		created() {
			console.log(this.$store)
		},
		methods: {
			getApplyInformation(orderId){
				var th=this;
				orderMangae.getApplyInformation(
				{"ID":orderId}).then(res => {
				
						th.url = res.data[0].url;
						th.orderId = res.data[0].id;
						th.userName = res.data[0].name;
						th.date = res.data[0].date;
						
				
						th.contactWay = res.data[0].contactWay;
						th.shippingAdress = res.data[0].shippingAdress;
						th.shipmentDate = res.data[0].shipmentDate;
						if(th.flag==0){//购买的
						th.Money = res.data[0].money;
						th.commodityList = res.data[0].orderProductList;
						}else if(th.flag==1){//积分兑换的订单
							th.integration = res.data[0].integrate;
						th.commodityList = res.data[0].product;	
						}
						
					})
						.catch(err => {
								uni.showModal({
									content: ' error',
									showCancel: false
							});
								
					})
			},
			//	管理员确认发货
			// ensureShipment(shipmentFlag){
				
			// 	orderMangae.ensureShipment({"ID":this.orderId,"orderFlag":this.flag,"shipmentFlag":shipmentFlag}).then(res => {
			// 		console.log(res);
			// 		if(res.code == 200){
			// 			uni.showToast({
			// 				title: '操作成功',
			// 				icon:'none',
			// 				duration: 1800
			// 			});
			// 		}else if(res.code == 1002){
			// 			uni.showToast({
			// 				title: '操作有误',
			// 				icon:'none',
			// 				duration: 1800
			// 			});
			// 		}
			// 		})
			// 			.catch(err => {
			// 					uni.showModal({
			// 						content: ' error',
			// 						showCancel: false
			// 				});
								
			// 		})
					
			// },
		       imageError: function(e) {
		           console.error('image发生error事件，携带值为' + e.detail.errMsg)
		       },
	},
	}
</script>
<style>
	page{
		background-color: #F5F5F5;
	}
	</style>
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
		box-shadow:0px 1rpx 15rpx rgba(105,105,105,0.4);
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
			font-size: 26rpx;
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
		z-index: 1;
		
		
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
		height: 400rpx;
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
			width: 80%;
		}
	}
	
	}
}
</style>
