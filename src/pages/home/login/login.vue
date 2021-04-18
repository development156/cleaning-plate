<template>
	<view class="all">
		<userInfoBtn @onClickBtn="onGetAuthData" @code="getCode">
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
		data(){
			return{
				code:''
			}
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
					let judgmentOfAuthority = uni.getStorageSync('judgmentOfAuthority')
				// let res=uni.getStorageSync("hasUserInfo")
				// console.log(res)
				if(this.code ==1002){
					uni.navigateTo({
						url:'../register/index'
					});
					
				}else{
					if(judgmentOfAuthority ==1){
						uni.navigateTo({
							url:'../home'
						});
					}
					if(judgmentOfAuthority ==2){
						uni.navigateTo({
							url:'../../admin/Upload/index'
						});
					}
					if(judgmentOfAuthority ==3){
						uni.navigateTo({
							url:'../../superAdmin/index'
						});
					}
				}
			    },
				getCode(code){
					this.code=code
				}
		}
	}
</script>
<style lang="scss">
	page {
		background: url('https://z3.ax1x.com/2021/04/15/cRyUWF.jpg') no-repeat;
		background-size: 100% 100%;
	
	}
	.all{
		button{
			margin: 65% auto;
			width: 90%;
			background-color: rgba(255, 255, 255, 0.5);
			color: black;
			border-radius: 20px;
		}
		
	}
	
</style>
