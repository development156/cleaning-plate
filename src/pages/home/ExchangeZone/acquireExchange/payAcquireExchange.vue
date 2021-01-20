<template>
	<view>
	<view class="tab">
		<view class="info">
			<view class="detail">
			<text>四川省南充市</text>
			<text>西南石油大学</text>
			<text>姓名</text>
			<text>17489731198</text>
			</view>
			<view class=""icon></view>
		</view>
		<text class="line"></text>
		<view class="way">
			<text>配送方式</text>
			<text>上门自取</text>
		</view>
	</view>
	
	<view class="goods_details">
		<view class="info">
		<image :src="imgUrl+Item.url"></image>
		<view class="details">
			<text>{{Item.description}}</text>
			<text> {{Item.productionPlace}}</text>
			<text>¥{{Item.univalence}}</text>
		</view>
		</view>
		<view class="total">	
		<text>共1件</text>
		<text>商品小计：¥{{Item.univalence}}</text>	
		</view>
	</view>
	
	<view class="footer">
		<view class="money">
			<text>应付：￥¥{{Item.univalence}}</text>
			<text>含运费：￥0.00</text>
		</view>
		<button type="submit">提交订单</button>
		
	</view>
	
	
	
	</view>
</template>

<script>
	export default{
		onLoad(e){
			const item = JSON.parse(decodeURIComponent(e.item));
			this.Item = item;
			console.log(this.Item)
		},
		data(){
			return {
				Item:[],
				
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	
	page{
		.tab{
			border-radius: 10px;
			background-color: white;
			height: 9.3125rem;
			display: flex;
			flex-direction: column;
			font-size: 0.75rem;
			.info{
				display: flex;
				justify-content: space-around;
				.detail{
					display: flex;
					flex-direction: column;
					text{
						margin-top: 0.625rem;
					
					}
				}
			}
			.line{
				height: 0.0625rem;
				margin:17px 17px 17px 1.0625rem ;
				background-color: gray;
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
			background-color: white;
			height: 3.25rem;
			display: flex;
			justify-content: space-around;
			margin-top: 20.625rem;
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
				margin-top: 0.3125rem;
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
