<template>
	<view class="hot_goods">
		<view class="tit">我的积分</view>
	
		
		<view class="goods_list">
			<view class="goods_item">
			<image src="../../../static/img/图片%203.png"></image>
			<view class="price">
				<text>￥2199</text>
			
			</view>
			<view class="name">
				我是文字我在文字
			</view>
			</view>
			
			<view class="goods_item">
			<image src="../../../static/img/图片%203.png"></image>
			<view class="price">
				<text>￥2199</text>
				>
			</view>
			<view class="name">
				我是文字我在文字
			</view>
			</view>
			
			<view class="goods_item">
			<image src="../../../static/img/图片%203.png"></image>
			<view class="price">
				<text>￥2199</text>
				
			</view>
			<view class="name">
				我是文字我在文字
			</view>
			</view>
			
			<view class="goods_item">
			<image src="../../../static/img/图片%203.png"></image>
			<view class="price">
				<text>￥2199</text>
			
			</view>
			<view class="name">
				我是文字我在文字
			</view>
			</view>
		
		
		<view class="goods_item">
		<image src="../../../static/img/图片%203.png"></image>
		<view class="price">
			<text>￥2199</text>
		
		</view>
		<view class="name">
			我是文字我在文字
		</view>
		</view>
				
		
	</view>
		</view>
</template>

<script>
</script>

<style lang="scss" scope>
	
	.hot_goods{
		background: #eee;
		overflow: hidden;
		margin-top: 10px;
		.tit{
			height: 50px;
			line-height: 50px;
			color: red;
			text-align: center;
			// 字间距
			letter-spacing: 20px;
			background: #fff;
			margin: 7rpx 0;
		}
	}
	.goods_list{
			display: flex;
			flex-wrap: wrap;
			padding: 0 10rpx;
			justify-content: space-between;
		.goods_item{
			background: #fff;
			width: 355rpx;
			margin-top: 10px;
			// 把盒子撑大了
			padding: 20rpx;
			box-sizing: border-box;
			border-radius: 10px;
			image{
				width: 70%;
				height: 130px;
				display: block;
				margin: 0 auto;
			}
			.price{
				color:   red;
				font-size: 30rpx;
			
			}
			.name{
				font-size: 32rpx;
				line-height: 50rpx;
				padding-bottom: 15rpx;
				padding-top: 10rpx;
			}
		}
	}
	
	
</style>
