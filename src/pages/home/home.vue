<template>
	<view class="content" v-if="isLogin==true">
		<view class="iconAll">
			<view class="icon1" @click="navTo2">
				我的
			</view>
			<view class="icon2" @click="navTo5">
				空间
			</view>
		</view>
		
		<view class="top">

			<view class="box1"   @click="confirmDialog">
				<image ></image>
				<text >上传照片</text>
			</view>
			
			<navigator class="box2"
			url="exchangeZone/index"
			>
			<image ></image>
			<text>兑换专区</text>
			</navigator>
			
			<view class="box3" @click="navTo3">
			<image ></image>
			<text>菜品展示</text>
			
			</view>
			
		
			<view class="box4" @click="navTo">
				<image ></image>
				<text>公告</text>
			
			</view>
			
			
			<navigator class="box5"
			url="ort/index"
			>
			<image ></image>
			<text>剩菜分析</text>
			
			</navigator>
			
		</view>
		
		
		<!-- 提交信息 -->
		<uni-popup ref="popupShare" >
			<uni-popup-define  @select="select"></uni-popup-define>
		</uni-popup>
		
		
	</view>
</template>
<script>
	import uniPopup from '@/components/common/uni-popup/uni-popup.vue'
	import {MyInfo} from '@/models/MyModel/changeInfo.js'
	const myInfo = new MyInfo()
	import uniPopupDefine from './upload/index.vue'
	import { mapGetters,mapMutations } from 'vuex'
	export default{
		components:{
			uniPopup,
			uniPopupDefine
		},
		// 添加用户信息权限
	computed: {
		...mapGetters([
			'userInfo'
		]),
		
	 
		
	},
	onLoad(){
		this.getMyInformation()
	},
	data(){
		return{
			isLogin:false,
			studentId:1,
			user:[],
		}
	},
	
	onShow(){
		console.log(this.userInfo)
		let a = this.userInfo.nickName
		if(a==null){
			this.isLogin = false
			//没有登录过
			uni.navigateTo({
				url:'./login/login'
			});
			}else{
				this.isLogin = true
			}
		},
	
	
		methods:{
			navTo(){
				uni.navigateTo({
				url:'advertising/advertisingList/advertisingList'
				})
			},
			navTo2(){
				uni.navigateTo({
				url:'mine/index'
				})
			},
			navTo3(){
				uni.navigateTo({
				url:'foodShow/CanteenList'
				})
			},
			navTo4(){
				uni.navigateTo({
				url:'upload/index'
				})
			},
			navTo5(){
				uni.navigateTo({
				url:'space/index'
				})
			},
			//打开弹框
			confirmDialog() {
				this.$refs.popupShare.open()
			},
			// 获得个人信息
			getMyInformation(){
				myInfo.getMyInformation(this.studentId).then(res=>{
					console.log(res)
					this.user = res.data
					 this.$store.dispatch('setMyInfo', this.user)
				})
			},
					
		}
	}
	
	
</script>
<style>
	page{
		background:url('https://ftp.bmp.ovh/imgs/2021/03/f8c4abe9b986ad8f.jpg') no-repeat ;
		 background-size:100% 100%;
		 
	}
</style>
<style lang="scss" scoped>
	.content{
		.iconAll{
			display: flex;
			justify-content: space-between;
			.icon1,.icon2{
				background-color: red;
				width: 3.125rem;
				height: 3.125rem;
			}
		}
		
		.top{
			color: white;
			display:flex;
			justify-content:space-evenly ;
			flex-wrap: wrap ;
			margin: 60% 0 12.28% 0;
		.box1,.box2{
			color: black;
			box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.4);
			border: 1px solid rgba(255, 255, 255, 100);
			@include gy("",15px,align-center,42.7%,215px);
			background-color: rgba(255, 255, 255, 100);
			text{
			margin-left: 25%;
			font-size: 20px;
			}
			image{
				
				display: block;
				margin: 0 auto;
				@include gy(45px,'','',2.75rem,2.75rem);
				margin-bottom: 1.625rem;
				
				border: 1px solid red;
			}
		}
		
		.box3,.box4{
			 @include gy(5%,15px,align-center,43%,5.1875rem);
				background-color: rgba(105, 78, 67, 100);
				
			image{
				display: block;
				margin: 5% 0 5% 1.375rem;
				@include gy('','','',1.3125rem,1.3125rem);
				border: 1px solid red;
			}
			text{
				margin-left: 1.375rem;
			}
		}
		
		.box5{
			 @include gy(1rem,15px,align-center,90.6%,4.6875rem);
			background-color: rgba(105, 78, 67, 100);
			text{
				margin-left: 1.375rem;
			}
			image{
				display: block;
				margin: 3% 0 3% 1.375rem;
				@include gy('','','',1rem,1rem);
				border: 1px solid red;
			}
			
		}
		}
	
	}
	
	
	
	
</style>
