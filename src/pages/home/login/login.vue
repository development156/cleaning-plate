<template>
	<view class="all">
		<userInfoBtn @onClickBtn="onGetAuthData">
			<button>微信授权确认登录</button>
		</userInfoBtn>
	</view>
</template>

<script>
	import userInfoBtn from '@/components/common/userInfoBtn.vue'
	
	export default{
		components: {
			userInfoBtn
		},
		methods:{
			onGetAuthData(){
				uni.navigateTo({
					url:'./home'
				});
			},
			onGetAuthData() {
			    	//授权成功后的回调事件
			    	console.log('success')
				let res=uni.getStorageSync("hasUserInfo")
				console.log(res)
				if(res!=null){
					uni.navigateTo({
						url:'../register/index'
					});
				}
			    },
			
		}
	}
</script>
<style lang="scss">
	.all{
		button{
			margin: 20% auto;
			width: 90%;
			background-color:#C9A65E ;
			color: white;
		}
		
	}
	
</style>
