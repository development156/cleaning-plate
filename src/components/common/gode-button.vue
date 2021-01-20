<template>
	<view class="container">
		 <!-- <navigator url="./addData" hover-class="navigator-hover"> -->
		<view @click="addData">{{delivery.content}}</view>
		 <!--   </navigator> -->
	</view>
</template>

<script>
	export default{
		name:'GodenButton',
		props:["delivery"],
		methods:{
			addData(){
				var url=this.delivery.url;
				console.log(url);
				if(url!=''){
				 uni.navigateTo({
				   url: url,
				   success: res => {},fail: (e) => {
				   	console.log("456")
				   	console.log(e)
				   },complete: () => {}
				 });
				 }else{
					 uni.showToast({
					 	    title: '操作成功',
					 	    duration: 1500
					 	});
				 }
			
			}
		}
	}
</script>

<style scoped lang="scss">
	.container{
		position: fixed;
		display: flex;
		width: 750rpx;
		height: 116rpx;
		
		bottom: 0;
		left: 0;
		background: #FFFFFF;
		
		view{
			
			align-self: center;
			margin: 0 auto;
			width: 694rpx;
			height: 88rpx;
			line-height: 88rpx;
			border-radius: 40rpx;
			color: rgba(255, 255, 255, 100);
			font-size: 40rpx;
			font-weight: 600;
			background-color: rgba(201, 166, 94, 100);
			text-align: center;
			border: 2rpx solid rgba(187, 187, 187, 100);
		}
	}
</style>
