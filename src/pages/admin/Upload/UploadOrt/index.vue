<template>
	<view>
		<view class="picture">
		<DataPresenceWeek></DataPresenceWeek>
		</view>
		
		<view class="latest-data">
			<p>最近数据</p>
			<view  v-for="(item,index) in array" :key="index">
			<view class="item-info">
				<span>剩菜 </span>
			<span class="tips" style="display: flex; flex-direction: column;">
			<span >{{item.weight}}</span>
			<span>{{item.data}}</span>
			</span>
			</view>
			</view>
			
			<navigator url="./allOrtData" hover-class="navigator-hover">
			<span v-if="hasdata" class="btn-alldata">所有数据</span>
			<span v-else style="color: #C8C7CC; display: block; padding: 20rpx; text-align: center;">暂无数据</span>
			
			</navigator>
		
		</view>
		<GodenButton :delivery="btn"></GodenButton>
		
	</view>
</template>

<script>
	import DataPresenceWeek from '../../../home/ort/DataPresenceWeek.vue'
	import GodenButton from '../../../../components/common/gode-button.vue'
	export default{
		name:'UploadOrt',
		
		data(){
			return{
			btn:{
				url:'addData',
				content:'添加数据'
			},
			hasdata:true,
			array:[{
				weight:'30.5kg',
				data:'2020-01-13'
			},
			{
				weight:'30.5kg',
				data:'2020-01-13'
			},]
			}
		},
		components:{
			DataPresenceWeek,
			GodenButton
			
		},
	
		
	}
</script>

<style scoped lang="scss">
	page{
		background-color: #F5F5F5;
		
	.picture{
		overflow-x: scroll;
		position: absolute;
		left: 42rpx;
		top: 24rpx;
		width: 666rpx;
		height: 602rpx
		
	}
	.latest-data{
		position: absolute;
		left: 42rpx;
		top: 630rpx;
		width: 664rpx;
		height: 602rpx;
		line-height: 40rpx;
		border-radius: 20rpx;
		
		border: 2rpx solid rgba(255, 255, 255, 100);
		background: #FFFFFF;
		
		p:nth-child(1){
            margin: 0 auto; 
			width: 596rpx;
			height: 110rpx;
			line-height: 110rpx;
			color: rgba(16, 16, 16, 100);
			font-size: 32rpx;
			font-weight: 600;
			font-family: 方正兰亭黑-标准;
			border-bottom: 2rpx solid rgba(187, 187, 187, 0.41);
		}
		.item-info{
			width: 596rpx;
			height: 126rpx;
			margin: 0 auto; 
			display: flex;
			flex: row nowrap;
			justify-content: space-between; /* 横向中间自动空间 */
			border-bottom: 2rpx solid rgba(187, 187, 187, 0.41);
			span:nth-child(1){
				font-weight: 600;
				font-size: 33rpx;
				color: rgba(16, 16, 16, 100);
				line-height: 66rpx;
			}
			.tips:nth-child(2){
				color: rgba(151, 151, 151, 100);
				font-size: 24rpx;
			}
		}
		.btn-alldata{
			line-height: 90rpx;
			padding-left:36rpx ;
			color: rgba(14, 172, 226, 100);
			font-size: 32rpx;
			font-family: Arial;
		}
		
	}

	}
</style>
