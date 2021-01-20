<template>
	<view class="content">
		<view class="top">
			<view class="box1">
				<text>上传照片</text>
				<!-- <image src="../../static/img/图片%203.png"></image> -->
			</view>
			<view class="box2">
				<text>兑换专区</text>
			<!-- <image src="../../static/img/图片%205.png"></image> -->
			</view>
			<view class="box3">
			<text>菜品展示</text>
			<!-- <image src="../../static/img/图片%207.png"></image> -->
			</view>
			<view class="box4">
				<text>公告</text>
			<!-- <image src="../../static/img/图片%204.png"></image> -->
			</view>
			<view class="box5">
				<text>剩菜分析</text>
			<!-- <image src="../../static/img/图片%206.png"></image> -->
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	
	.content{
		
		 @include gy('','','',100%,100%);
		.top{
			display:flex;
			justify-content: space-around;
			flex-wrap: wrap ;
			margin: 60% 18rpx 0 18rpx;
		.box1{
			@include gy('',15px,align-center,165px,119px);
			background-color: rgba(255, 175, 62, 0.9);
			image{
				display: block;
				margin: 0 auto;
				@include gy('','','',2.75rem,2.75rem);
			}
		}
		.box2{
			
			 @include gy('',15px,align-center,161px,119px);
			background-color: rgba(255, 175, 62, 0.7);
			image{
				@include gy('','','',2.4375rem,2.4375rem);
			}
			
		}
		.box3{
			 @include gy(5%,15px,align-center,166px,119px);
			background-color: rgba(255, 175, 62, 0.8);
			image{
				@include gy('','','',2.3125rem,2.3125rem);
			}
		}
		.box4{
			 @include gy(5%,15px,align-center,74px,119px);
			background-color: rgba(255, 175, 62, 0.6);
		
			image{
				@include gy('','','',1.75rem,1.75rem);
			}
		}
		.box5{
			 @include gy(5%,15px,align-center,75px,119px);
			background-color: rgba(255, 175, 62, 0.5);
		
			image{
				width: 12px;
				@include gy('','','',1.4375rem,1.4375rem);
			}
			
		}
		}
	
	}
	
	
	
	
</style>
