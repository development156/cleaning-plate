<template>
<view>
		
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
			
		
		
		<view class="order_info">
			<view class="infos">
				<image :src="imgUrl+Item.url"></image>
				<view class="right">
					<view class="tit">
						{{Item.description}}
					</view>
					<view class="info">
						<text>*1</text>
					</view>
				</view>
			</view>
		<view class="content">
			<text>使用积分</text>
			<text>{{Item.integrate}}</text>
		</view>
		</view>

	<view class="tabber"> 
		<view class="left">
			<text>合计</text>
			<text>{{Item.integrate}}积分</text>
		</view>
		<button size="mini" @click="confirm">确认兑换</button>
	</view>

</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import{exchangeCredit}  from '@/models/exchangezone/creditsExchange/exchangeCredit'
	const Exchange = new exchangeCredit()
	
	export default{
		data(){
			return {
				Item:[]
			}
		},
		computed: {
			...mapGetters([
				'myInfo'
			])
		},
		onLoad(e){
			const item = JSON.parse(decodeURIComponent(e.item));
			this.Item = item;
			console.log(this.Item)
		},
		methods:{
			confirm(){
				const time = new Date()
				const studentId = 1
				Exchange.exchange(this.Item.id,studentId,time.getYear(),this.Item.name,this.Item.url,this.Item.integrate).then(res=>{
					uni.showToast({
					  title: res.msg,
					  icon:"none"
					});
					// 进行判断是否兑换成功
					
				}).catch(error=>{
					uni.showToast({
					  title: '积分不足',
					  icon:"none"
					});
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
			font-family: "方正兰亭黑-标准";
			
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
		
		.order_info{
			font-size: 14px;
			width: 100%;
			height: 11.4375rem;
			text-align: center;
			border-top: 1px solid lightgray;
			border-bottom: 1px solid lightgray;
			.infos{
				
			display: flex;
			image{
				width: 4.125rem;
				height: 4.125rem;
				
				margin: 1.3125rem 0rem 0rem 1.5rem;
			}
			.right{
				margin: 1.1875rem 0px 2rem 0px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
		
			}
			}
		
		.content{
			display: flex;
			justify-content: space-between;
			margin: 0rem 1.375rem 0px 1.875rem;
			text:nth-child(1){
					color: #999999;	
					
					}
			
		}
	}
	.tabber{
		margin-top: 18.75rem;
		display: flex;
		.left{
			font-size: 0.75rem;
			display: flex;
			
			flex-direction: column;
			justify-content: space-evenly;
			margin-left: 4.375rem;
			text:nth-child(1){
					color: #999999;	
					
					}
			text:nth-child(2){
							color:#E2704D;	
						}
		}
		button{
			margin-right: 1.125rem;
			width: 11rem;
			height: 2.9375rem;
			background-color: #C9A65E;
			color: #fff;
			font-size: 1.25rem;
		}
	}
	}
	
	
</style>
