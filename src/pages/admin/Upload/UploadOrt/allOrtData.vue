<template>
	<view>
	<view class="container1">
		<span class="tips1">{{array.length}}条数据</span>
		
		<view class="one-data">
		<span>剩菜 </span>
		<span>{{TotalWasteInfo}}</span>
		</view>
	</view >
	
	<view class="container2">
	<span class="tips2">2020年1月</span>
	<span class="tips2" style="float: right;">536.2kg</span>
	</view>
	
	<view class="container3">
		<view  v-for="(item,index) in array" :key="index">
		<view class="item-info">
			<span>剩菜 </span>
		<span class="tips" style="display: flex; flex-direction: column;">
		<span style='color: rgba(16, 16, 16, 100);font-size: 32rpx;text-align: right;'>{{item.wasteFood}}kg</span>
		<span><span>{{item.timeFrame}}</span>{{item.uploadDate}}</span>
		</span>
		</view>
		</view>
		
		<span v-if="hasNodata"  style="color: #C8C7CC; display: block; padding: 20rpx; text-align: center;">暂无数据</span>
		
	</view>
	</view>
</template>

<script>
	import { OrtUpload } from '@/models/admin/Upload/ortUpload.js'
	const ortUpload = new OrtUpload();
	
	
	export default{
		name:'allOrtData',
		data(){
			return{
				TotalWasteInfo:'',
				hasNodata:false,
				array:[{
					day: null,
					id: 1,
					timeFrame: "下午",
					uploadDate: "2021-02-02 00:00:00",
					wasteFood: 20,
				},
				{
					timeFrame: "下午",
					uploadDate: "2021-02-02 00:00:00",
					wasteFood: 20,
				},{
					timeFrame: "下午",
					uploadDate: "2021-02-02 00:00:00",
					wasteFood: 20,
				},
				]
			}
		},
		created() {
			this.getTotalWasteInfo();
			this.getAllOrt();
			
		},
		methods:{
			getTotalWasteInfo(){
				ortUpload.getTotalWasteInfo().then(res => {
					console.log(res)
					// this.TotalWasteInfo=res.data;
					})
					.catch(err => {
						uni.hideLoading()
						uni.showToast({
							title: 'error',
							icon:'none',
							duration: 1400
						});
						
					})	
			},
			getAllOrt(){
				
				ortUpload.getAllOrt().then(res => {
					this.array=res.data;
					})
					.catch(err => {
						uni.hideLoading()
						uni.showToast({
							title: 'error',
							icon:'none',
							duration: 1400
						});
						
					})	
			}
			
		}
	}
</script>
<style>
	page{
		background: #F5F5F5 ;
		}
</style>
<style lang="scss" scoped>
	page{
		
		
	.container1{
		display: flex;
		align-items:center;
		justify-content:center;
		
		.tips1{
			position: absolute;
			left: 78rpx;
			top: 78rpx;
			color: rgba(151, 151, 151, 100);
			font-size: 28rpx;
		}
		.one-data {
		background: #FFFFFF;
		width: 664rpx;
		height: 110rpx;
		line-height: 110rpx;
		margin-top: 138rpx;
		display: flex;
		border: 2rpx solid #C8C7CC;
		
		flex-direction: row ;
		justify-content: space-between; /* 横向中间自动空间 */
		
		border-radius: 10px;
		// border: 1px solid rgba(255, 255, 255, 100);
		
		
		span:nth-child(1){
			font-weight: 600;
			font-size: 32rpx;
			color: rgba(16, 16, 16, 100);
			padding-left:34rpx; 
			
			
		}
		span:nth-child(2){
			color: rgba(14, 172, 226, 100);
			font-size: 32rpx;
			padding-right:34rpx; 
			
			
		}
		.tips2{
			
			color: rgba(151, 151, 151, 100);
			font-size: 28rpx;
		}
	}
	
	
	}
	.container2{
		margin: 0 auto;
		width: 590rpx;
		color: rgba(151, 151, 151, 100);
		font-size: 28rpx;
		padding-top: 28rpx  ;  
		padding-bottom: 28rpx  ; 
		
		 
	}
	.container3{
		overflow-y: scroll;
		border: 2rpx solid #C8C7CC;
		background: #FFFFFF;
		border-radius: 10px;
		text-align: center;
		width: 664rpx;
		margin: 0 auto;
		margin-bottom: 30rpx;
		.item-info{
			width: 596rpx;
			height: 126rpx;
			margin: 0 auto; 
			display: flex;
			flex: row nowrap;
			justify-content: space-between; /* 横向中间自动空间 */
			border-bottom: 2rpx solid rgba(187, 187, 187, 0.41);
			span:nth-child(1),{
				padding-top: 24rpx;
				font-weight: 600;
				font-size: 32rpx;
				color: rgba(16, 16, 16, 100);
				line-height: 46rpx;
			}
			
			.tips:nth-child(2){
				color: rgba(151, 151, 151, 100);
				font-size: 24rpx;
				span{
					font-size: 23rpx;
					color: rgba(151, 151, 151, 100);
					padding-right: 20rpx;
				}
			}
		}
	}
	}
</style>
