<template>
	<view>
	<view class="header">
		<view class="view-header_root"  >
			<view>
				<image class="avatar-img" :src="userInfo.avatarUrl"  @click="navTo"></image>
				<text>{{userInfo.nickName }}</text>
			</view>
		</view>
	</view>	
	
	<view class="content">
		
		
		<view class="item" >
		<text>学号</text>
		<text>{{myInfo.studentId}}</text>
		</view>

		<view class="item" >
		<text>专业年级</text>
		<text>{{myInfo.profession+myInfo.grade}}</text>
		</view>
		
		<view class="item" >
		<text>电话</text>
		<text>{{myInfo.phone}}</text>
		</view>
		
		<view class="item" >
		<text>寝室号</text>
		<text>{{myInfo.sroom}}</text>
		</view>
		<view class="item" >
		<text>我的积分</text>
		<text>{{myInfo.integrate}}</text>
		</view>
		
		<view class="item1">
		<text @click="navTo" >修改资料</text>
		<view class="iconfont icon-gengduo" @click="navTo"></view>
		
		</view>
	</view>
	</view>
</template>

<script>
	import {
	    mapGetters
	  } from 'vuex'
	
	export default{
	
		computed: {
			  ...mapGetters([
			  	'userInfo','myInfo'
			  ]),
		},
		
		methods:{
			
			navTo(){
				uni.navigateTo({
				url:'./index'
				})
			}
		}
	}
</script>
<style>
	page{
			background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);

	}
</style>

<style lang="scss" scoped>
	page{

	.view-header_root {
			margin-top:2.6875rem;
		view {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				font-size: 30rpx;
				color: black;
		}
		
	}
	
	.avatar-img {
		width: 120upx;
		height: 120upx;
		border-radius: 60upx;
		margin-bottom: 0.625rem;
	}
	
	.content{
		margin-top: 3.3125rem;
		font-size: 30rpx;
		.item1{
			color: black;
			display: flex;
			justify-content: space-between;
			margin: 4% 1.25rem 0px 1.25rem;
			
			
		}
		.item{
			color: black;
			display:flex;
			margin: 3.25rem 1.25rem 0px 1.25rem;
			text{
				margin-bottom: 4%;
			}
			border-bottom: 1px solid lightgray;
			justify-content: space-between;
		}
		
	}
	}
</style>
