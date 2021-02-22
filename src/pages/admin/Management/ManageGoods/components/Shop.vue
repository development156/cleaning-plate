<template>
	<view>
		<button class="addGood" @click="addGoods">上传商品</button>
	</view>
</template>

<script>
	
	export default{
		methods:{
			addGoods:function(){
				console.log("addGoods")
				uni.navigateTo({
				 url:'./components/addShopGoods'
				 })  
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.addGood{
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 104rpx;
		line-height: 104rpx;
		background-color: rgba(201, 166, 94, 100);
		text-align: center;
		color: rgba(255, 255, 255, 100);
		font-size: 40rpx;
		font-weight: 600;
		border: 2rpx solid rgba(255, 255, 255, 100);
	}
	
</style>
