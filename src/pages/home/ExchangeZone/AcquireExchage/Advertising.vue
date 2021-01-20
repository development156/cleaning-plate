<template>
	<view>
		
	<view class="box1">水果通知</view>
	<view class="box2">产品通知</view>
	<view class="box3">宣传通知</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
page{
	
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	flex-direction: column;
	.box1{
		width: 21.1875rem;
		height: 12.75rem;
		background-color: red;
		border-radius: 10px;		
		margin:2.0625rem 1.125rem 2rem 1.125rem ;
		
	}
	.box2{
		width: 21.1875rem;		
		height: 12.75rem;
		border-radius: 10px;
		margin:0rem 1.125rem 2rem 1.125rem ;
		background-color: gold;
	}
	.box3{
		width: 21.1875rem;
		height: 12.75rem;
		border-radius: 10px;
		margin:0rem 1.125rem 2rem 1.125rem;
		background-color: greenyellow;
	}
	
}



</style>

