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
		<text>{{user.studentId}}</text>
		</view>

		<view class="item" >
		<text>专业年级</text>
		<text>{{user.profession+user.grade}}</text>
		</view>
		
		<view class="item" >
		<text>电话</text>
		<text>{{user.phone}}</text>
		</view>
		
		<view class="item" >
		<text>寝室号</text>
		<text>{{user.sroom}}</text>
		</view>
		<view class="item" >
		<text>我的积分</text>
		<text>{{user.integrate}}</text>
		</view>
		
		<view class="item">
		<text>修改密码</text>
		</view>
	</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import {MyInfo} from '@/models/MyModel/changeInfo.js'
	const myInfo = new MyInfo()
	export default{
	data(){
		return{
			// 临时设置的学号全局可用
			studentId:1,
			user:[],
			
		}
	},
		computed: {
			...mapGetters([
				'userInfo'
			])
		},
		onLoad(){
			this.getMyInformation()
		},
		methods:{
			getMyInformation(){
				myInfo.getMyInformation(this.studentId).then(res=>{
					console.log(res)
					this.user = res.data
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
	background: -webkit-linear-gradient(top, #151515 0%,#848f94 0%,#485f67 0%,#485e69 4%,#4a5e67 4%,#4d5c63 24%,#4e5b61 28%,#505b5d 28%,#53585a 40%,#57585a 42%,#595651 59%,#5e5452 63%,#5d544f 63%,#5e534f 67%,#5e544b 67%,#655146 89%,#665043 89%,#665043 97%,#694e43 97%,#694e43 100%);
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
				margin-bottom: 4%;
			}
			border-bottom: 1px solid rgba(223, 223, 223, 0.26);
			justify-content: space-between;
		}
	}
	}
</style>
