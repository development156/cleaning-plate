<template>
    <view>
<view class="head">
  <view class="tab1">个人</view>
  <view class="tab2">班级</view>
  <view class="info">
	  <view class="portrait">
		  <view class="head_portrait"></view>
		  <view class="info_portrait">哈哈 
		  <view>12345678</view>
		  </view>
	  </view>
	  <view class="total_credit">
		  总荣誉度
		  <view style="color: rgba(243, 227, 178, 100); font-size: 36px;">2</view>
	  </view>
	  <view class="ranking">
	  		  排名
	  		 <view style="color: rgba(243, 227, 178, 100);font-size: 36px; ">99</view>
	  </view>
  </view>
</view>
<view class="content">
	
	<view class="content_info" v-for="(item,index) in array" :key="index">
			<view class="item_info">
				<view class="item_infoleft">
				<view class="item_id">{{item.id}}</view>
				<view class="info_head"></view>
				<view class="info_name">{{item.username}}</view>
				</view>
				<view class="info_credit">{{item.credit}}</view>
			<view>
	  </view>
	</view>
</view>	
</view>
	</view>
</template>

<script>
	export default {
	  name: 'space',
	  data() {
	        return {
	            array: [{
	                id:'1',
					head:'',
					username:'李一',
					credit:'212'
	            }, {
	               id:'2',
	               head:'',
	               username:'王五',
	               credit:'231'
	            }, ],
	}
	}
			
}
	
</script>

<style lang="scss"  scoped>
	page{
		background-color: rgba(119, 92, 76, 0.5);
	    vertical-align :middle;
	.head{
		background-color: rgba(119, 92, 76, 100);
		height: 366rpx;
	.info{
		
		display:flex;
		// justify-content: space-around;
		align-items:center;/*垂直对齐方式*/
		position: absolute;
		height: 172rpx;
		left: 44rpx;
		top: 176rpx;
		font-size: 24rpx;
		font-family: SourceHanSansSC-regular;
		.portrait{
			position: relative;
			display:flex;
			width: 284rpx;
			justify-content:space-between;
			align-items:center;
			.head_portrait{
			   width: 128rpx;
			    height: 128rpx;
				color: rgba(255, 255, 255, 100);
				font-size: 40rpx;
			   border-radius: 172rpx;
				font-family: SourceHanSansSC-regular;
				background-color: rgba(112, 148, 174, 100);
				text-align: center;
				border: 1px solid rgba(255, 255, 255, 100);
			}
			.info_portrait{
				margin-top: 16rpx;
				font-size: 28rpx;
				flex-direction:column;
				text-align: center;
				font-family: SourceHanSansSC-regular;
				color: rgba(223, 223, 223, 100);
			}
		}
		.total_credit{
			
			position: absolute;
			left: 400rpx;
			width: 96rpx;
		}
		.ranking{
		 
			position: absolute;
			left: 560rpx;
			flex-direction:column;
			
		}
	}
	.tab1{
		position: absolute;
		left: 58rpx;
		top: 42rpx;
		width: 320rpx;
		height: 62rpx;
		line-height: 62rpx;
		border-radius: 40rpx 0rpx 0rpx 40rpx;
		background-color: rgba(132, 101, 88, 100);
		color: rgba(255, 255, 255, 100);
		text-align: left;
		font-family: PingFangSC-regular;
		font-size: 28rpx;
		text-align: center;
		border: 2rpx solid rgba(223, 223, 223, 100);
	}
	.tab2{
		position: absolute;
		left: 378rpx;
		top: 42rpx;
		width: 320rpx;
		height: 62rpx;
		line-height: 62rpx;
		border-radius: 0px 40rpx 40rpx 0px;
		background-color: white;
		text-align: center;
		font-size: 28rpx;
		border: 2rpx solid rgba(223, 223, 223, 100);
	}
	}
	
	.content{
		height: 100%;
		border: 1px solid rgba(112, 148, 174, 100);
		
		.content_info{
			left: 96px;
			top: 320px;
			border: 1px solid rgba(187, 187, 187, 100);
			
			.item_info{
				display: flex;
				justify-content:space-between;
				height: 82rpx;
				align-items:center;
				.item_infoleft{
			display: flex;
			margin-left: 42rpx;
			
			.item_id{
				width: 32rpx;
				height: 82rpx;
				color: rgba(132, 118, 115, 100);
				font-size: 56rpx;
				text-align: left;
				font-family: SourceHanSansSC-regular;
			}
			.info_head{
				border-radius:60rpx;
				 margin-top: 6rpx;
				margin-left: 28rpx;
				line-height: 82rpx;
				width: 60rpx;
				height: 60rpx;
				
				background-color: white;
				border: 1px solid rgba(187, 187, 187, 100);
			}
			.info_name{
				
				line-height: 82rpx;
				margin-left: 28rpx;
				color: rgba(16, 16, 16, 100);
				font-size: 40rpx;
				font-family: SourceHanSansSC-regular;
			}
}
				.info_credit{
					
					margin-left: 290rpx;
					
					color: rgba(105, 78, 67, 100);
					font-size: 48rpx;
			
					font-family: SourceHanSansSC-regular;
				}
			}
			
		}
	}
	}
</style>
