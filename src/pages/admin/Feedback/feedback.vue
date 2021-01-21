<template>
	<view class="info-list">
	        <view class="info-item" v-for="(item,index) in array" :key="index">
	<navigator  url="./inputFeed" hover-class="navigator-hover"> 
		<view class="info-item1">
	            <view class="info_image">
	                <image style="width:92rpx; height: 92rpx; background-color:#7094AE ;border-radius: 200rpx;" mode="aspectFit" :src='imgUrl+item.url'
	                    @error="imageError"></image>
	            </view>
	            <view class="info_content">
					
				<view class="info_contr">
				<span class="info_nickname">{{item.nickname}}</span>
				<span class="data">{{item.data}}</span>
				</view>
				
				<view class="info_backinfo">{{item.backinfo}}</view>
				</view>
				
				
			</view>	
	</navigator>		
	        </view>		
			<view v-if="have" class="have"> 暂无反馈信息</view>
			
			<view>
			<!-- 　　　　　　　// 其中uni-p-b-98是公共样式类名，表示padding-bottom: 98upx;  设置的98upx是和底部导航栏的高度保持一致，页面的内容就不会被底部导航遮挡住啦 -->
			            <view class="uni-p-b-98"></view>
			<!-- 　　　　　　　// 最后引入自定义组件，并传当前栏目对应的pagePath到自定义组件，显示当前栏目的选中样式 -->
			            <tabBar :pagePath="'Feedback/feedback'"></tabBar>
			  </view>
	 </view>		
	
</template>

<script>
	export default{
		data() {
		        return {
					have:false,
					array: [{
					               "nickname":"它的昵称",
								   "image":"头像",
								   "backinfo":"我觉得食堂很好很好很好很好太好了哈哈哈哈哈哈哈哈哈哈哈哈",
								   "data":"前天 09:12"
					            } ,
								{
								               "nickname":"它的昵称",
											   "image":"头像",
											   "backinfo":"我觉得食堂很好很好很好很好太好了哈哈哈哈哈哈哈哈哈哈哈哈",
											   "data":"前天 09:12"
							},
						{
							               "nickname":"它的昵称",
										   "image":"头像",
										   "backinfo":"我觉得食堂很好很好很好很好太好了哈哈哈哈哈哈哈哈哈哈哈哈",
										   "data":"前天 09:12"
						},					
						],
					
					}
					},
					 methods: {
					        imageError: function(e) {
					            console.error('image发生error事件，携带值为' + e.detail.errMsg)
					        },
					}
	}
</script>

<style scoped lang="scss">
	page{
		display: flex;
	.info-list{
		margin: 0 auto;
		.info-item1{
			
			display: flex;
			justify-content: space-between;
			flex-flow: row  nowrap;
			
			height:208rpx;
			border: 1px solid rgba(255, 255, 255, 100);
			.info_image{
				
				// margin-left: 5rpx;
				margin-top:34rpx;
				
				border: 1px solid rgba(255, 255, 255, 100);
			}
			.info_content{
				flex-flow:column;
				
				margin-left:28rpx;
				margin-top: 34rpx;
			    border-bottom:1px solid rgba(	192,192,192,0.4);
				.info_contr{
					  display: flex;
					  flex-flow:  row nowrap;
					  justify-content: space-between;

				.info_nickname{
					color: rgba(16, 16, 16, 100);
					font-size: 16px;
					
				}
				.data{
					color: rgba(119, 118, 114, 100);
					font-size: 14px;
					
					margin-left:270rpx;
				}
				}
				.info_backinfo{
					margin-top: 28rpx;
					width: 508rpx;
					height: 88rpx;
					color: rgba(119, 118, 114, 100);
					font-size: 14px;
				}
				
			}
		}
		}
	}
</style>
