<template>
	<view>
	<view class="tab">
		<view class="all">
			<view class="info">
				<text>收货人：</text>
				<text>{{myInfo.name}}</text>
			</view>
			<view class="address">
				<text>电话：</text>
				<text>{{myInfo.phone}} </text>
			</view>
			<view class="address">
				<text>收货地址：</text>
				<text>{{myInfo.sroom}}</text>
			</view>
				
			<view class="icon"></view>
		</view>
	
		<view class="way">
			<text>配送方式</text>
			<text>上门自取</text>
		</view>
	</view>
	
	<view class="goods_details" v-for="item in Item" >
		<view class="info" v-for="i in item.orderProductList">
		<image :src="imgUrl+i.url"></image>
		<view class="details">
			<text>{{i.name}}</text>
			<text>*{{i.number}}</text>
			<text>¥{{i.univalence}}/份</text>
		</view>
		</view>
		
		<view class="total">	
		<text>共{{totalNum1}}件</text>
		<text>商品小计：¥{{totalPrice1}}</text>	
		</view>
	</view>
	
	<view class="footer">
		<view class="money">
			<text>应付：¥{{totalPrice1}}</text>
			<text>含运费：￥0.00</text>
		</view>
		<button type="submit" @click="pay">提交订单</button>
		
	</view>
	
	
	
	</view>
</template>

<script>
	// import{exchangeCredit}  from '../../mine/myOrder/myOrder.vue'
	import{exchangeCredit}  from '@/models/exchangezone/creditsExchange/exchangeCredit'
	const Exchange = new exchangeCredit()
	import { mapGetters } from 'vuex'
	export default{
		onLoad(e){
			const Pid = JSON.parse(decodeURIComponent(e.item));
			this.pid = Pid;
			console.log(this.pid)
			this.acquirePay()
			
		},
		data(){
			return {
				Item:[],
				// 临时设置的id
				studentID:1,
				pid:4,
				
				// 总数量
				totalNum:0,
				totalPrice:0
				
			}
		},	
		computed:{
			totalNum1(){
				for(var i=0;i<this.Item.length;i++){
					console.log(this.Item[i].orderProductList.length)
					for(var j =0;j<this.Item[i].orderProductList.length;j++)
					
						this.totalNum+=this.Item[i].orderProductList[j].number
						
					}
				return this.totalNum
			
			},
			totalPrice1(){
				for(var i=0;i<this.Item.length;i++){
					console.log(this.Item[i].orderProductList.length)
					for(var j =0;j<this.Item[i].orderProductList.length;j++)
						this.totalPrice+=this.Item[i].orderProductList[j].number*this.Item[i].orderProductList[j].univalence
					}
					return this.totalPrice
			},
			...mapGetters([
				'myInfo'
			])
		},
		methods:{
		acquirePay(){
			Exchange.acquirePay(this.studentID,this.pid).then(res=>{
				console.log(res.data[0].orderProductList[0].orderID)
				this.Item = res.data
				console.log(this.Item)
			})
		},
		
		// 进行支付
		pay(){
		Exchange.orderPay(this.pid,this.totalPrice).then(res=>{
			console.log(res)
			uni.showToast({
			  title: res.msg,
			  icon: "none"
			});
		})
		},
		/**
		 * 修改商品数量
		 */
		changeNum:function(index,id,type) {
			var that = this;
			var carts = that.carts;
			var number = parseInt(carts[index].number);
			if(type==2){
				number = number - 1;
				if(number<=1){
					number = 1;
				}
			}else{
				number = number + 1;
			}
			carts[index].number = number;
			this.$emit('changeNum',carts,id,type);
		},
		}
	}
</script>
<style lang="scss">
	page{
		background-color: #F5F5F5;
		.line{
			
			background-color: gray;
		}
	}
</style>
<style lang="scss" scoped="scoped">
	
	page{
		.tab{
			border-radius: 10px;
			background-color: white;
			height: 9.3125rem;
			display: flex;
			flex-direction: column;
			font-size: 0.75rem;
			.all{
				.info{
					font-size: 14px;
					margin:1.5rem  1.125rem 0.4375rem 0.875rem;
					text:nth-child(1){
							color: #999999;	
							}
					text:nth-child(2){
								margin-left: 0.875rem;
									}
				}
				.address{
					font-size: 14px;
					margin:0.4375rem 1.375rem 0.8125rem  0.875rem;
					text:nth-child(1){
							color: #999999;	
							
							}
						
				}
				border-bottom: 1px solid lightgray;
			}
			
			.way{
				display: flex;
				justify-content: space-around;
			}
			
		}
		
		
	
		.goods_details{
				margin-top: 0.875rem;
			border-radius: 10px;
			border: 1px solid rgba(255, 255, 255, 100);
			background-color: #FFFFFF;
			height: 13.0625rem;
			.info{
				display: flex;
				image{
					width: 5.9375rem;
					height: 5.5rem;
					margin: 3.3125rem  0 0 1.0625rem ;
					
				}
				.details{
					margin:3.3125rem  0 0 0.5625rem;
					display: flex;
					height: 6.25rem;
					width: 14.5625rem;
					justify-content: space-around;
					flex-direction: column;
					.countBox {
						position: absolute;
						right: 140rpx;
						bottom: 25rpx;
						right: 10rpx;
						bottom: 20rpx;
					}
					
					.countBox .iconfont{
						font-size: 46rpx;
					}
					
					.cartNum {
						width: 80rpx;
						height: 50rpx;
						text-align: center;
						line-height: 50rpx;
						font-size: 32rpx;
						color: #1a256a;
					}
					
					text{
						&:nth-child(1){
							font-size: 0.75rem;
						}
						&:nth-child(2){
							font-size: 8px;
							color:#9F9F9F;
						}
					}
				}
			}
			
			.total{
				display: flex;
				margin: 1.8125rem 0 0.875rem 11.5rem;
				font-size: 0.625rem;
				
			}
		}
		.footer{
		
			
			justify-content: space-around;
			width: 100%;
			position: fixed;
			left: 0;
			bottom: 0;
			background: #FFFFFF;
			box-shadow: #f3f3f3 0rpx -5rpx 10rpx;
			height: 98rpx;
			padding: 0 300rpx 0 30rpx;
			z-index: 99;
			.money{
			
				font-size: 0.875rem;
				margin:0.625rem 0 0 1.25rem;
				display: flex;
				flex-direction: column;
				&:nth-child(2){
					margin-left: 2.5rem
				}
			}
			button{
				margin-top: -2.5rem;
				position: absolute;
				left: 47%;
				border-radius: 30px;
				width: 6.9375rem;
				height: 2.5rem;
				text-align: center;
				color: white;
				background-color: #C9A65E;
			}
		}
		
		
	}
	
	
	
	
</style>
