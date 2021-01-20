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
		<view class="item" v-for="item in items" >
		<text>{{item.name}}</text>
		<text>{{item.value}}</text>
		</view>
		
		<view class="item">
		<text>修改密码</text>
		</view>
	</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	
	export default{
	data(){
		return{
			items:[{
				name:"学号",
				value:"201831771237"
			},
			{
				name:"专业年级",
				value:"2018级信息管理与信息系统2班"
			},
			{
				name:"电话",
				value:"201831771237"
			},
			{
				name:"寝室号",
				value:"201831771237"
			}]
		}
	},
	
	
		computed: {
			...mapGetters([
				'userInfo'
			])
		},
	}
</script>

<style lang="scss">
	page{
		background-color: #7094AE;
	.view-header_root {
			margin-top:6.6875rem;
		view {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				font-size: 0.75rem;
				color: #fff;
		}
		
	}
	.avatar-img {
		width: 120upx;
		height: 120upx;
		border-radius: 60upx;
		margin-bottom: 0.625rem;
	}
	
	.content{
		margin-top: 2.3125rem;
		font-size: 0.875rem;
		.item{
			color: #FFFFFF;
			display:flex;
			margin: 3.25rem 1.25rem 0px 1.25rem;
			text{
				margin-bottom: 0.625rem;
			}
			border-bottom: 1px solid rgba(223, 223, 223, 0.26);
			
			justify-content: space-between;
		}
	}
	}
</style>
