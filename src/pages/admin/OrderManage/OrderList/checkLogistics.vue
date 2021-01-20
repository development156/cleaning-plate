<template>
	<view class="container">
		
	   <view class="title">收货地址</view>	
	   
	   <view style="border-bottom: 22rpx solid #F4F5F9;">
	    <view class="divery-info">
		   <span>名字 <span>139139913999</span></span>
		   
		   	<view class="address">
		   	四川省南充市顺庆区西南石油大学	四川省南充市顺庆区西南石油大学	四川省南充市顺庆区西南石油大学	四川省南充市顺庆区西南石油大学	四川省南充市顺庆区西南石油大学
		   	</view>
		</view>
		</view>
		
		<view class="divery-num">
		   <span class="tle">申通快递</span>
		   <p>运单号：<span>9328542018243782</span></p>
		  
		</view>
		
		
		<view style="
		margin: 44rpx 0 54rpx 0;
		margin-left: 56rpx;
		width: 650rpx;
		text-align:center;
		border: 1rpx solid rgba(187,187,187, 0.3);"></view>

	 </view>
</template>

<script>
	export default{
		name:'CheckLogistics',
		data(){
			return{
		inputSerialNum: null,
		inputSerialNum2: null,
			}
		},
		methods: {
			handleConfirm() {
				
				// this.$emit()
				}
		}
		
			
	}
			
</script>

<style scoped lang="scss">
	page{
		align-items: center;
		.container{
			width: 750rpx;
			background-color: #FFFFFF;
		.title{	
		
		margin-left: 44rpx;
		margin-top:56rpx;
		color: rgba(119, 118, 114, 100);
		font-size: 28rpx;
		}
		
		.divery-info,.divery-num{
		margin-left: 42rpx;
		line-height: 60rpx;
		span:nth-child(1)
		{
		color: rgba(0, 0, 0, 1);
		font-size: 28rpx;
		font-weight:600 ;
		
		}
		}
		.divery-info{
			margin-top:24rpx;
			
			
			.address{
				width: 580rpx;
				height: 72rpx;
				line-height: 35rpx;
				overflow-y: scroll;
				color: rgba(0, 0, 0, 1);
				font-size: 14px;
				text-align: left;
				font-family: 方正兰亭黑-标准;
				margin-bottom:34rpx;
			}
		}
		.divery-num{
			.tle{
				display: block;
				margin-top: 28rpx;
			}
			p:nth-child(2){
				width: 480rpx;
				color: rgba(0, 0, 0, 1);
				font-size: 14px;
				text-align: left;
				font-family: 方正兰亭黑-标准;
			}
		}
		
	}
	}
	
</style>
