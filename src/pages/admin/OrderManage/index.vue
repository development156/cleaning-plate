<template>
	<view >
		<view style="position: fixed; left: 0; z-index: 99; top: 0; ">
		<taHeadBar @state="jugement($event)"></taHeadBar>
		</view>
		<view class="item-list">
			
		        <view class="image-item" v-for="(item,index) in Allarray" :key="index">
					
				<navigator :url="'./OrderList/orderList?ID='+item.id +'&flag='+item.flag+'&hasTackled='+item.hasTackled" ><!-- hover-class="navigator-hover" -->
					
					<view class="first-line">
				<view class="user-info">
					<image style=" width: 48rpx; height:48rpx; background-color: #eeeeee;border-radius: 48rpx;" mode="aspectFill" :src='imgurl+item.url'
		                    @error="imageError"></image>
					<span>{{item.name}}</span>
				</view>
				<view class="order-state">
					等待<span v-show="tackled">买家收货</span><span v-show="!tackled">发货</span>
				</view>
					</view>
					<view style="margin-top: 30rpx;">
		            <view class="image-content">
		                <image style="width: 156rpx; height: 158rpx; background-color: #eeeeee;border-radius: 10px;" mode="aspectFit" :src='imgurl+item.url'
		                    @error="imageError"></image>
		            </view>
					<view class="description">
		            <view class="image-title" v-for="(it,index) in item.orderProductList" :key='item.orderProductList.pid'>
						<p>· {{it.description}}</p>
					</view>
					</view>
					</view>
					<!-- <span>{{item.date}}</span> -->
					<view v-if="item.flag==0" style="margin-right: 25rpx; font-size: 24rpx;float: right;">实收款：
					<span v-if="item.flag==0" style="margin-left: 8rpx;">{{item.money}} </span>
					<span v-if="item.flag==1" style="height: 21px;width: 50px; color: rgba(201, 166, 94, 100);">{{item.integrate}} </span>
					<span v-if="item.flag==1" style="margin-left: 8rpx;"> (积分兑换)</span>
					</view>
					
					</navigator>
					<view  v-if="!tackled" class="btn" @click="dipach(item.id,item.flag,1)">去发货</view>
					<view  v-else  class="btn" @click="dipach(item.id,item.flag,2)" >收获提醒</view>
					
				</view>
				<!-- <text v-if="tackled &&  have" class="have">此地暂无订单1</text> -->
				<text v-if="tackled && !have1" class="have"> 此地暂无订单</text>
				<text  class="have"> ~ ~   到底啦o(*￣▽￣*)ブ   ~ ~</text>
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
		onLoad() {
			this.imgurl = this.imgUrl;
		},
		data(){
			return{
			imgurl:'',	
			have:false,
			have1:false,//待处理为空
			tackled:false,
			Allarray:[],
			array: [//未处理的订单
				// 	{
				//    "studentId": "1",
				//    "date": "2020",
				//    "url": "",
				//    "integration": 8,
				//    "id": 7,
				
				// 	'description':'hu弄哭了你看来你可能就可能就vvvvvvvvvvvvvvvvvvvvvvvvv',
				// 	"modesofPayment":true  //判断是不是积分兑换  1表示积分兑换，2表示自己购买
				
				// }
			],
			tackleArray:[ //处理的订单
				
			],
			
			}
		},
		components:{
			taHeadBar
		},
		created() {
			this.gotAllGoods(0);
		},
		methods:{
			imageError: function(e) {
			    console.error('image发生error事件，携带值为' + e.detail.errMsg)
			},
			dipach: function(id,flag,shipmenFlag){
				//    uni.navigateTo({
				//      url:'./dispachList?id= '+id
				// })
				var th= this;
				orderMangae.ensureShipment({"ID":id,"orderFlag":flag,"shipmentFlag":shipmenFlag}).then(res => {
					if(res.code == 200){
						th.gotAllGoods(0);
						uni.showToast({
							title: '操作成功',
							icon:'none',
							duration: 1800
						});
						
					}else{
						uni.showToast({
							title: '操作失败',
							icon:'none',
							duration: 1800
						});
					}
				})
				
			},
			jugement: function(state){
				
				if(state==1){
					this.Allarray=this.array;
					this.tackled=false;
				}else if(state==2){//state==2
					
					this.tackled=true;
					this.Allarray=this.tackleArray;
					this.gotAllGoods(1);
				}
			},
			gotAllGoods:function(shipmentFlag){
				//查询未发货的订单
				var th=this;
				let list=[];  let list1=[];
				if(shipmentFlag == 0){
					
				orderMangae.getUnshipment({"shipmentFlag":0}).then(res => {
					
				// 	res.data.forEach(function (item) {
				// 		list.push(item)
				// 	})
					res.data.orderToApplyList.forEach(function (item) {
						item.hasTackled=false;//没有确认订单
						item.flag=0;//支付订单
						list.push(item)
					})
					res.data.convertViewList.forEach(function (item) {
						item.hasTackled=false;//没有确认订单
						item.flag=1;//兑换列表
						list.push(item)
					})
					th.array=list;//放入未处理的list	
				
					th.jugement(1);
					
				})
				.catch(err => {
							uni.showModal({
												content: ' 没有需要处理的订单',
												showCancel: false
						});
							
				})
				}else if(shipmentFlag==1){
					orderMangae.getUnshipment({"shipmentFlag":1}).then(res => {
						
						res.data.orderToApplyList.forEach(function (item) {
							item.hasTackled=true;//确认订单
							item.flag=0;//支付订单
							list1.push(item)
						})
						res.data.convertViewList.forEach(function (item) {
							item.hasTackled=true;//确认订单
							item.flag=1;//兑换列表
							list1.push(item)
						})
						th.Allarray=list1;
						th.tackleArray=list1;//放入处理的list	
						
						// this.jugement(2);
						
					})	.catch(err => {
							uni.showModal({
												content: ' 你连网络了吗~',
												showCancel: false
						});
							
				})
				}
				if(th.tackleArray.length==0){
							th.have=true
						}
						
						if(th.array.length==0){
							th.have1=true
						}
				
				// 		orderMangae.getAllGoods().then(res => {
							
				// 		console.log(res.data)
				// 		
				// 		res.data.forEach(function (item) {
							
				// 		    if(item.shipmentFlag == 1){
				// 				list.push(item)
				// 			}else if(item.shipmentFlag == 2){
				// 				list1.push(item)
				// 			}
				// 		});
				// 		this.array=list;//放入未处理的list
				// 		this.tackleArray=list1;
				// 		this.jugement(1);
				// 		
						
				// 	})
				// 	.catch(err => {
				// 			uni.showModal({
				// 								content: ' 你连网络了吗~',
				// 								showCancel: false
				// 		});
							
				// })	
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		height: 100%;
		display: flex;
			background-color:#ddd;
					
		justify-content: center;
		// background-color: #000000;//#F4F3F3
		border-radius: 10rpx;
		border: 2rpx solid rgba(255, 255, 255, 100);
		
	.item-list{
		width: 704rpx;
		margin: 0 auto;
		// height: 434rpx;
		margin-top: 108rpx;
		margin-bottom:136rpx;
		.have{
			// background: #000000;
			display: block;
			
			margin-top: 220rpx;
			color: 	#A9A9A9;
			font-size: 33rpx;
			text-align: center;
			vertical-align: middle;
			
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
		.description{
			height:134rpx;
			overflow: hidden;
			position: relative;
			left: 40rpx;
			right: 20rpx;
			
		.image-title{
			
			flex-wrap: wrap; 
			
			// top: 10rpx;
			width: 400rpx;
			
			color: rgba(16, 16, 16, 100);
			font-size: 28rpx;
			word-break: break-all;
			
			p{
				word-break: break-all;
				overflow:hidden; // 超出的文本隐藏
				text-overflow:ellipsis; 
				display:-webkit-box; // 将对象作为弹性伸缩盒子模型显示。
				 -webkit-box-orient:vertical;  //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
				-webkit-line-clamp:1; // 结合上面两个属性，表示显示的行数。
			}
		}
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
			line-height:8rpx;
			border-radius: 40rpx;
			text-align: center;
			border: 2rpx solid rgba(187, 187, 187, 100);
			font-size: 28rpx;
			// float: right;
			top:70rpx;
			left: 495rpx;
			font-family: PingFangSC-regular;
			z-index: 9009;
		}
	}
	
	}
</style>
