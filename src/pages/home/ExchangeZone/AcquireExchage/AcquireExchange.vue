<template>
<view>
	<view >
		<view class="info">
			<text>收货人：</text>
			<text>张三 13913991399</text>
		</view>
		<view class="address">
			<text>收货地址：</text>
			<text>四川省南充市顺庆区舞凤街道 犹豫安陆</text>
		</view>
		
		<view class="order_info">
				<image></image>
				<view class="right">
					<view class="tit">
						南充本地橙子5kg
					</view>
					<view class="info">
						<text>*1</text>
					</view>
				</view>
		<!-- <view>
			<text>使用积分</text>
			<text>199</text>
		</view> -->
		
		</view>

	<view>
		<text>合计199积分</text>
		<button size="mini">确认兑换</button>
	</view>
</view>
</view>
</template>

<script>
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
			display: flex;
			width: 100%;
			height: 9.4375rem;
			text-align: center;
			border: 1px solid rgba(187, 187, 187, 100);
			border-left: none;
			image{
				width: 4.125rem;
				height: 4.125rem;
				border: 1px solid rgba(187, 187, 187, 100);
				margin: 1.3125rem 0rem 0rem 1.5rem;
			}
			.right{
				margin: 1.1875rem 0px 4rem 0px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.tit{
				
			}
			.info{
				margin-left: 0px;
			}
			}
		
		
		
	}
	}
	
	
</style>
