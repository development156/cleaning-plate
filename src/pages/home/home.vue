<template>
	<view class="content" >
		
		<view class="icon" @click="navTo2">
			我的
		</view>
		
		<view class="top">

			<view class="box1"   @click="confirmDialog">
				<text >上传照片</text>
				<image ></image>
			</view>
			
			<navigator class="box2"
			url="exchangeZone/index"
			>
				<text>兑换专区</text>
			<image ></image>
			</navigator>
			
			<view class="box3" @click="navTo3">
			<text>菜品展示</text>
			<image ></image>
			</view>
			
		
			<view class="box4" @click="navTo">
				<text>公告</text>
			<image ></image>
			</view>
			
			
			<view class="box5" >
				<text>剩菜分析</text>
			<image ></image>
			</view>
		</view>
		
		
		<!-- 提交信息 -->
		<uni-popup ref="popupShare" >
			<uni-popup-define title="分享到" @select="select"></uni-popup-define>
		</uni-popup>
		
		
	</view>
</template>
<script>
	import uniPopup from '@/components/common/uni-popup/uni-popup.vue'
	
	import uniPopupDefine from '@/pages/home/upload/index.vue'
	export default{
		components:{
			uniPopup,
			uniPopupDefine
		},
	
		
		methods:{
			navTo(){
				uni.navigateTo({
				url:'advertising/advertising'
				})
			},
			navTo2(){
				uni.navigateTo({
				url:'mine/index'
				})
			},
			navTo3(){
				uni.navigateTo({
				url:'foodShow/foodShow'
				})
			},
			navTo4(){
				uni.navigateTo({
				url:'upload/index'
				})
			},
			//打开弹框
			confirmDialog() {
				this.$refs.popupShare.open()
			},
					
		}
	}
	
	
</script>

<style lang="scss" scoped>
	.content{
		.icon{
			background-color: red;
			width: 3.125rem;
			height: 3.125rem;
		}
		.top{
			color: white;
			display:flex;
			justify-content: space-between;
			flex-wrap: wrap ;
			
			margin: 14.4375rem 1.125rem 0 1.125rem;
		.box1,.box2{
			color: black;
			box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.4);
			border: 1px solid rgba(255, 255, 255, 100);
			@include gy("",15px,align-center,10rem, 13.4375rem);
			background-color: rgba(255, 255, 255, 100);
			image{
				
				display: block;
				margin: 0 auto;
				@include gy('','','',2.75rem,2.75rem);
			}
		}
		
		.box3,.box4{
			 @include gy(5%,15px,align-center,10rem,5.1875rem);
				background-color: rgba(105, 78, 67, 100);
			image{
				@include gy('','','',2.3125rem,2.3125rem);
				
			}
		}
		
		.box5{
			 @include gy(1rem,15px,align-center,21.1875rem,4.6875rem);
			background-color: rgba(105, 78, 67, 100);
		
			image{
				
				@include gy('','','',1.4375rem,1.4375rem);
			}
			
		}
		}
	
	}
	
	
	
	
</style>
