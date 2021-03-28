<template>
	<view>
		<view class="iconfont icon-xuanzhong_ top">
			已完成
			
			</view>
		<view class="tip">您的订单已经签收，欢迎您再次光临！</view>
		<view class="address">
			<text>姓名:  {{myInfo.name}}</text>
			<text>电话:  {{myInfo.phone}}</text>
			<text>地址:  {{myInfo.sroom}}</text>
		</view>
		<view class="goods_details">
			<view class="info">
			<image :src="Item[0].url"></image>
			<view class="details">
				<text>{{Item[0].orderProductList[0].name}}</text>
				<text> {{Item[0].orderProductList[0].description}}</text>
				<text>¥{{Item[0].money}}</text>
			</view>
			</view>
			<view class="total">	
			<text>共1件</text>
			<text>商品小计：¥{{Item[0].money}}</text>	
			</view>
		</view>
		<view class="order_info">
			<text>订单编号：{{Item[0].id}}</text>
			<text>创建时间：{{Item[0].date}}</text>
			<text>支付方式：{{Item[0].contactWay}}</text>
			<view class="line"></view>
			<text>上门自取</text>
			<view class="money">
			<text>实付款</text>
			<text> ¥{{Item[0].money}}</text>
		</view>
		</view>
		
		
	</view>
</template>

<script>
	import {exchangeCredit} from '../../../../../models/exchangezone/creditsExchange/exchangeCredit.js'
	const Exchange = new exchangeCredit()
	import { mapGetters } from 'vuex'
	export default{
		computed: {
			...mapGetters([
				'userInfo','myInfo'
			])
		},
		data(){
			return{
				Item:[],
				studentID:1,
				pid:''
			}
		},
		onLoad(e){
			this.pid  = JSON.parse(decodeURIComponent(e.item));
			console.log(this.pid)
			this.acquirePay()
			
		},
		methods:{
			acquirePay(){
				Exchange.acquirePay(this.studentID,this.pid).then(res=>{
					console.log(res.data[0].orderProductList[0].orderID)
					this.Item = res.data
					console.log(this.Item)
				})
			},
		}
		
		
	}
	
</script>

<style lang="scss">
	page{
		background-color: gainsboro;
	}
	.top{
		height: 5.125rem;
		background-color: #C9A65E ;
		text-align: center;
		color: white;
	}
	.tip{
	
		text-align: center;
		border: 1px solid rgba(255, 255, 255, 100);
		font-size: 0.8125rem;
		height: 3.75rem;
		background-color: #FFFFFF;
	}
	.address{
		display: flex;
		flex-direction: column;
		font-size: 0.8125rem;
		padding-left: 2.4375rem;
		margin-top: 0.875rem;
		height: 6.25rem;
		justify-content: space-around;
		border-radius: 10px;
		background-color: #FFFFFF;
		border: 1px solid rgba(255, 255, 255, 100);
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
				border-radius: 10px;
			}
			.details{
				margin:3.3125rem  0 0 0.5625rem;
				display: flex;
				height: 6.25rem;
				width: 14.5625rem;
				justify-content: space-around;
				flex-direction: column;
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
	.order_info{
		margin-top: 0.875rem;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		font-size: 0.875rem;
		padding:1.25rem 0 0 1.375rem ;
		text{
			margin-bottom: 1.25rem;
			&:nth-child(5){
				margin-top: 1.25rem;
			}
		}
		.line{
			background-color: #FFFFFF;
			width: 20.6875rem;
			height: 0.0625rem;
			opacity: 0.67;
			background-color: gainsboro;
		}
		.money{
			background-color: #FFFFFF;
			display: flex;
			margin:1.8125rem 0 0 13.5rem;
			font-size: 0.75rem;
			justify-content: space-around;
			text{
				&:nth-child(2){
					color: red;
				}
			}
			
		}
	}
	
	
	
</style>
