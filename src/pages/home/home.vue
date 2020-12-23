<template>
	<view>
	
		<view class="top">
			<view class="box1">上传照片</view>
			<view class="box2">兑换专区</view>
			<view class="box3">菜品展示</view>
			<view class="box4">公告</view>
			<view class="box5">剩菜分析</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	page{
		width: 375px;
		height: 812px;
		
		.top{
		height: 715px;
		display:flex;
		justify-content: space-around;
		flex-wrap: wrap ;
		.box1{
		
			width: 165px;
			height: 119px; 
			border-radius: 15px;
			background-color: rgba(255, 175, 62, 0.9);
			font-family: "SourceHanSansSC-regular";
			text-align: center;
			border: 1px solid rgba(255, 255, 255, 100);
		}
		.box2{
			
			width: 161px;
			height: 119px; 
			border-radius: 15px;
			background-color: rgba(255, 175, 62, 0.7);
			text-align: center;
			border: 1px solid rgba(255, 255, 255, 100);
		}
		.box3{
			
			width: 166px;
			height: 119px; 
			
			border-radius: 15px;
			background-color: rgba(255, 175, 62, 0.8);
			text-align: center;
			border: 1px solid rgba(255, 255, 255, 100);
		}
		.box4{
			
			width: 74px;
			height: 119px; 
		
			border-radius: 15px;
			background-color: rgba(255, 175, 62, 0.6);
			text-align: center;
			border: 1px solid rgba(255, 255, 255, 100);
		}
		.box5{
		
			width: 75px;
			height: 119px;
		
		
			border-radius: 15px;
			background-color: rgba(255, 175, 62, 0.5);
			text-align: center;
			border: 1px solid rgba(255, 255, 255, 100);
		}
		}
	}
	
	
	
	
	
</style>
