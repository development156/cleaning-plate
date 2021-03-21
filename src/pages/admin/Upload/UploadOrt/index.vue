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
			<span >{{item.wasteFood}}</span>
			<span>{{item.uploadDate}}</span>
			</span>
			</view>
			</view>
			
			<navigator url="./allOrtData" hover-class="navigator-hover">
			<span v-if="hasdata" class="btn-alldata">所有数据</span>
			<span v-else style="color: #C8C7CC; display: block; padding: 20rpx; text-align: center;">暂无数据</span>
			
			</navigator>
		
		</view>
		
		<view v-if="judgmentAuthority">
		<GodenButton :delivery="btn"></GodenButton>
		</view>
		
	</view>
</template>

<script>

	import DataPresenceWeek from '../../../home/ort/DataPresenceWeek.vue'
	import { OrtUpload } from '@/models/admin/Upload/ortUpload.js'
	const ortUpload = new OrtUpload();

	import GodenButton from '../../../../components/common/gode-button.vue'
	export default{
		name:'UploadOrt',
		
		data(){
			return{
			judgmentAuthority: true,

			btn:{
				url:'addData',
				content:'添加数据'
			},
			hasdata:true,
			array:[{
				timeFrame: "下午",
				uploadDate: "2021-02-02 00:00:00",
				wasteFood: 20,
			},
			
			],
			}
		},
		components:{
			DataPresenceWeek,
			GodenButton
			
		},
		created() {
			this.getAllOrt();
			let judgmentOfAuthority = uni.getStorageSync('judgmentOfAuthority');
			if(judgmentOfAuthority==1){
				this.judgmentAuthority=false;
			}
		},
		methods:{
			getAllOrt(){
				var th=this;
				var i=0;
				ortUpload.getAllOrt().then(res => {
						res.data.forEach((item)=>{
								if(i<2){
								th.array.push(item)
								i++;
								
								}else{
									return; 
								}
								
							
						});
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
		background-color: #F5F5F5;
	}
	</style>
<style scoped lang="scss">
	page{
		
		
	.picture{
		overflow-x: scroll;
		position: absolute;
		// left: 42rpx;
		top: -7rpx;
		
		margin: 0 auto;
		
	}
	.latest-data{
		position: absolute;
		left: 42rpx;
		top: 592rpx;
		width: 664rpx;
		height:  42%;
		line-height: 40rpx;
		border-radius: 20rpx;
		overflow-y: scroll;
		// border: 2rpx solid #C8C7CC;
		background: #FFFFFF;
		
		p:nth-child(1){
            margin: 0 auto; 
			
			width: 596rpx;
			height: 100rpx;
			line-height: 98rpx;
			color: rgba(16, 16, 16, 100);
			font-size: 32rpx;
			font-weight: 600;
			font-family: 方正兰亭黑-标准;
			border-bottom: 2rpx solid rgba(187, 187, 187, 0.41);
		}
		.item-info{
			width: 596rpx;
			height: 20%;
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
			span:nth-child(2){
				text-align: center;
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
