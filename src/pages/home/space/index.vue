<template>
    <view class="page">
<view class="head">
  <view class="tab1" :style="{backgroundColor:(index==true) ? 'rgba(119, 92, 76, 0.5)':'white'}" @click="change">个人</view>
  <view class="tab2" :style="{backgroundColor:(index==false) ? 'rgba(119, 92, 76, 0.5)':'white'}" @click="change">班级</view>
  <view class="info">
	  <view class="portrait" v-if="index==true">
		  <image class="head_portrait" :src="userInfo.avatarUrl"></image>
		  <view class="info_portrait">
			  {{myInfo.name}}
		  <view>{{myInfo.college}}</view>
		  </view>
	  </view>
	  <view class="portrait" v-if="index==false">
	  		  <!-- <image class="head_portrait" :src="userInfo.avatarUrl"></image> -->
	  		  <view class="info_portrait">
	  			  {{myInfo.profession}}
	  		  <view>{{myInfo.grade}}</view>
	  		  </view>
	  </view>
	  <view class="total_credit">
		  总荣誉度
		  <view style="color: rgba(243, 227, 178, 100); font-size: 30px;">{{myInfo.fixedintegral}}</view>
	  </view>
	  <view class="ranking">
	  		  排名
	  		 <view style="color: rgba(243, 227, 178, 100);font-size: 30px; ">{{rankNumber}}</view>
	  </view>
  </view>
</view>
<view class="content">
	
	<view class="content_info" v-for="(item,index) in perList" :key="index">
			<view class="item_info">
				<view class="item_infoleft">
				<view class="item_id">{{index}}</view>
				<image :src="item.avatarUrl" class="info_head"></image>
				<view class="info_name">{{item.profession}}</view>
				<view class="info_name">{{item.name}}</view>
			
				</view>
				<view class="info_credit">{{item.integrate}}</view>
				<view  class="iconfont icon-aixin2 ai"   @click="dian(index)"></view>
				<view v-if="dianzan==index" class="iconfont icon-aixin1 ai" style="color: red;"  @click="dian(index)"></view>
			<view>
	  </view>
	</view>
</view>	
</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import {Rank} from '../../../models/space/Rank.js'
	const rank = new Rank()
	export default {
	  name: 'space',
	  data() {
	        return {
				perList:[],
				index:true,
				rankNumber:0,
				dianzan:-1,
				
	}
	},
	computed: {
		...mapGetters([
			'userInfo','myInfo'
		])
	},
	onLoad(){
		this.getPerRank()
	},
	methods:{
		// 改变index
		change(){
			this.index = !this.index
			this.getPerRank()
		},
		// 点赞
		dian(index){
			this.dianzan = index
		},
		// 获得个人排名
		getPerRank(){
			if(this.index == true){
				rank.getPerRank().then(res=>{
					console.log(res)
					this.perList = res.data
					this.perList.sort(function (a, b) {
					  return (a.integrate - b.integrate)
					});
					this.perList.reverse();
				for(var i=0;i<this.perList.length;i++){
					if(this.myInfo.fixedintegral>this.perList[i].integrate){
						this.rankNumber = i
					}
				}
				})
			}
			else{	
				// 集体排名
				rank.getClassRank().then(res=>{
					console.log(res)
					this.perList  = res.data
					this.perList.sort(function (a, b) {
					  return (a.integrate - b.integrate)
					  
					});
					this.perList.reverse();
					console.log(this.perList)
					for(var i=0;i<this.perList.length;i++){
						if(this.myInfo.fixedintegral>this.perList[i].integrate){
							this.rankNumber = i
						}
					}
				})
			}
		},

		
	},
	
			
}
	
</script>
<style>
	page{
		background-color: #f5f5f5;
	}
</style>
<style lang="scss"  scoped>
	page{
	.head{
	background: -webkit-linear-gradient(left, #f0f0f0 0%,#d5c9b3 0%,#cdbea9 0%,#b5a58c 0%,#f0f0f0 0%,#b5a58c 0%,#b5a58c 13%,#b5a58c 27%,#b09e86 86%,#a7937b 100%);
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
				font-size: 33rpx;
				flex-direction:column;
				text-align: center;
				font-family: SourceHanSansSC-regular;
				color: black;
			}
		}
		.total_credit{
			
			position: absolute;
			left: 400rpx;
			width: 96rpx;
		}
		.ranking{
		 
			position: absolute;
			left: 550rpx;
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
		color: black;
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
			
			
			.item_info{
				display: flex;
				justify-content:space-between;
				height: 180rpx;
				align-items:center;
				border-bottom: 1px solid lightgrey;
				.item_infoleft{
			display: flex;
			margin-left: 35rpx;
			
			.item_id{
				width: 25rpx;
				
				height: 82rpx;
				color: rgba(132, 118, 115, 100);
				font-size: 48rpx;
				 margin-top: 20rpx;
				font-family: SourceHanSansSC-regular;
			}
			.info_head{
				border-radius: 0.3125rem;
				 margin-top: 5rpx;
				margin-left: 35rpx;
				line-height: 82rpx;
				width: 110rpx;
				height: 110rpx;
				background-color: white;
				
			}
			.info_name{
				margin-top: 7%;
				margin-left: 10px;
				color: rgba(16, 16, 16, 100);
				font-size: 32rpx;
				font-family: SourceHanSansSC-regular;
			}
}
				.info_credit{
					position: absolute;
					right: 15%;
				
					color: rgba(105, 78, 67, 100);
					font-size: 48rpx;
			
					font-family: SourceHanSansSC-regular;
				}
				.ai{
					position: absolute;
					right: 2%;
					font-size: 30px;				
				}
			}
			
		}
	}
	}
</style>
