<template>
	<view class="container">
		
		<navigator url="/pages/admin/Upload/UploadOrt/index"  hover-class="none">
		<view>
		<view class="leftort">
			<view class="iconfont icon-gonggao"></view>
			<view class="word">
			<span class="defont">上传剩菜统计</span>
			<view class="font">上传每日剩菜统计数据 </view>
			
			</view>
		</view>
		</view>
		</navigator>
		<navigator  url="/pages/admin/Upload/UploadAnnoncement/index"  hover-class="none"> 
		<view class="annoncement">
			<!-- icon-navicon-cptx -->
			<view class="iconfont icon-fenzu"></view>
			<view class="word">
				<span class="defont">上传公告</span>
				<view class="font">上传水果、宣传、产品公告 </view>
				</view>
		</view>
		</navigator>
		
		<navigator url="/pages/admin/Upload/UploadFood/index"  hover-class="none"> 
		<view class="food">
			<view class="iconfont icon-navicon-cptx"></view>
			<view class="word">
				<span class="defont">上传菜品</span>
				<view class="font">上传每个窗口新增的菜</view>
		   </view>
		</view>
		
			
		</navigator>
		
		<view>
		<!-- 　　　　　　　// 其中uni-p-b-98是公共样式类名，表示padding-bottom: 98upx;  设置的98upx是和底部导航栏的高度保持一致，页面的内容就不会被底部导航遮挡住啦 -->
		            <view class="uni-p-b-98"></view>
		<!-- 　　　　　　　// 最后引入自定义组件，并传当前栏目对应的pagePath到自定义组件，显示当前栏目的选中样式 -->
		            <tabBar :pagePath="'Upload/index'"></tabBar>
		 </view>
		 
		 
		   <uni-fab
		    :pattern="pattern"
		    :content="content"
		    :horizontal="horizontal"
		    :vertical="vertical"
		    :direction="direction"
		    @trigger="trigger"         
		    ></uni-fab>
	</view>
</template>

<script>
	import uniFab from '@/components/common/uni-fab/uni-fab.vue';
	export default{
		name:'UploadOrt',
		data(){
			return{
				content:[{
					iconPath:'@/static/images/admin/hall.png',
					selectedIconPath:'@/static/images/admin/hall.png',
					text:'食 堂',
					active:false,
					
				},{
					iconPath:'@/static/images/admin/academy.png',
					selectedIconPath:'@/static/images/admin/academy.png',
					text:'学 院',
					active:false
				},{
					iconPath:'@/static/images/admin/shop.png',
					selectedIconPath:'@/static/images/admin/shop.png',
					text:'商 城',
					active:false
				}],
				horizontal:'right',
				direction:'vertical',
				vertical:'bottom',//top
				pattern:{
					backgroundColor:"#FFFFFF",
					buttonColor:'#303133 ',//#303133 10000%
					selectedColor:'#FFAF3E',
					color:'#838383'//
				}
			}
		},
		 components: {
		        uniFab
		    },
		methods:{
			trigger(e){
				console.log(e)
				if(e.index == 0){
					//管理食堂
					uni.navigateTo({
					 url:'../Management/ManageCanteen/index'
					 })   
				}else if(e.index == 1){
					//管理学院
					uni.navigateTo({
					 url:'../Management/ManageAcademy/index'
					 })
				}else if(e.index == 2){
					uni.navigateTo({
					 url:'../Management/ManageGoods/index'
					 })
				}
			}
			// tab1(){
			// 	//路由方式需要补全
			// 	uni.navigateTo({
			// 		url:'Upload/UploadOrt/index',
			// 	    success: res => {},fail: (e) => {
			// 			console.log("456")
			// 			console.log(e)
			// 		},complete: () => {}
			// 	})
			// }
			
		}
	}
</script>

<style  lang="scss" scoped >
	page{
		display: flex;
		align-items: center;
		flex-direction: column;
		width: 100%;
		
		.word{
			width: 360rpx;
			position: relative;
			flex-flow: column;
			left: 220rpx;
			top: -170rpx;
		.defont{
			display: block;
			font-weight: 900;		
			height: 36rpx;
			color: rgba(16, 16, 16, 100);
			font-size: 32rpx;
		}
		.font{
			margin-top:12rpx;
			height: 34rpx;
			color: rgba(176, 176, 176, 100);
			font-size: 28rpx;
			text-align: left;
		}
		}
		.container{
			display: flex;
			align-items: center;
			flex-direction: column;
			// width: 750rpx;
		.leftort{
			   // width: 90%;
			margin-top: 58rpx;
			width: 668rpx;
			
			height: 250rpx;
			border-radius: 10rpx;
			
			box-shadow: 0px 2rpx 14rpx 0px rgba(98, 98, 98, 0.5);
			border: 2rpx solid rgba(255, 255, 255, 100);
			.icon-gonggao{
				color: black;
				margin-left: 85rpx;
				font-size: 70rpx;
				line-height: 250rpx;
			}
		
		}
		.annoncement{
			    // display: flex;
			margin-top: 38rpx;
			width: 668rpx;
			// width: 90%;
			height: 250rpx;
			box-shadow: 0px 2rpx 14rpx 0px rgba(98, 98, 98, 0.5);
			border: 2rpx solid rgba(255, 255, 255, 100);
			border-radius: 10rpx;
			.icon-fenzu{
				color: black;
				margin-left: 85rpx;
				font-size: 73rpx;
				line-height: 250rpx;
				
			}
		}
		.food{
			  
			margin-top: 36rpx;
			width: 668rpx;
			// width: 90%;
			height: 250rpx;
			box-shadow: 0px 1px 7px 0px rgba(98, 98, 98, 0.5);
			border-radius: 5px;
			border: 2rpx solid rgba(255, 255, 255, 100);
			.icon-navicon-cptx{
				color: black;
				margin-left: 85rpx;
				font-size: 73rpx;
				line-height: 250rpx;
				
			}
		}
		}
		}
</style>
