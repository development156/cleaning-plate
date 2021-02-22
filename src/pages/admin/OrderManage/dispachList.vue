<template>
	<view class="container">
		
	   <view class="title">请认真核对快递单号</view>	
	   
	    <view class="divery-num">
		   <span>快递单号</span>
		   
		   	<view class="modal-body">
		   				<input v-model="inputSerialNum" style="width: 500rpx;  opacity: 0.7;  padding-top: 15rpx; padding-left: 50rpx;font-size: 28rpx;font-family: Microsoft Yahei;" class="uni-input" focus placeholder="请输入快递单号" />
		   	</view>
		</view>
		<view style="
	margin: 54rpx 0 54rpx 0;
	margin-left: 56rpx;
	width: 638rpx
	text-align: center;
	border: 1rpx solid rgba(187,187,187, 0.2);"></view>
		<view class="divery-firm">
		   <span>快递公司</span>
		   <view class="modal-body">
		   			<input v-model="inputSerialNum2" style="width: 500rpx; opacity: 0.7;  padding-top: 15rpx; padding-left: 50rpx;font-size: 28rpx; font-family: Microsoft Yahei;" class="uni-input" focus placeholder="请选择快递公司" />
		   </view>
		</view>
<!-- 		<view class="btn confirm" :style="{'color': confirmTextColor}" @click="handleConfirm">{{confirmText}}</view>
 --><view class="bottom">
	<view class="confirm" style="" @click="handleConfirm">确认提交</view>
	 </view>
	 </view>
</template>

<script>
	export default{
		name:'dispachList',
		data(){
			return{
		inputSerialNum: null,
		inputSerialNum2: null,
			}
		},
		onLoad() {
			console.log(this.$route.query.id)
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
		display: flex;
		// align-items: center;
	background-color: #F4F5F9 ;
		.container{
			width: 750rpx;
			background: #FFFFFF;
			height: 676rpx;
			
		.title{	
		position: absolute;
		left: 56rpx;
		top: 130rpx;
		width: 360rpx;
		height: 46rpx;
		color: rgba(87, 87, 87, 100);
		font-size: 40rpx;
		font-weight: 600;
		}
		.divery-num,.divery-num{
		display: flex;
		flex-direction: column;
		
		}
		.divery-num,.divery-firm{
		span:nth-child(1)
		{
		margin-left: 56rpx;
		margin-top: 294rpx;
		color: rgba(87, 87, 87, 100);
		font-size: 28rpx;
		}
		}
		.bottom{
		position: fixed;
		bottom: 0; 
		background-color: #FFFFFF;
		height: 116rpx;
		width: 750rpx;
		
		  
		.confirm{
			margin: auto;
			margin-top: 2%;
			
			width: 94%;
			height: 88rpx;
			line-height: 88rpx;
			border-radius: 40rpx;
			background-color: rgba(201, 166, 94, 100);
			text-align: center;
			border: 2rpx solid rgba(187, 187, 187, 100);
			color: rgba(255, 255, 255, 100);
			font-size: 40rpx;
		}
		}
	}
	}
	
</style>
