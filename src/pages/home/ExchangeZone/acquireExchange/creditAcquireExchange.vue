<template>
<view>
	
		<view class="info">
			<text>收货人：</text>
			<text>张三 13913991399</text>
		</view>
		<view class="address">
			<text>收货地址：</text>
			<text>四川省南充市顺庆区舞凤街道 犹豫安陆</text>
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
		<button size="mini">确认兑换</button>
	</view>

</view>
</template>

<script>
	export default{
		data(){
			return {
				Item:[]
			}
		},
		onLoad(e){
			const item = JSON.parse(decodeURIComponent(e.item));
			this.Item = item;
			console.log(this.Item)
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
			height: 9.4375rem;
			text-align: center;
			border: 1px solid rgba(187, 187, 187, 100);
			border-left: none;
			.infos{
				
			display: flex;
			image{
				width: 4.125rem;
				height: 4.125rem;
				border: 1px solid rgba(187, 187, 187, 100);
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
