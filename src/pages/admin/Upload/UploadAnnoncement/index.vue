<template>
	  <view>
	        
	        <view class="uni-list">
	            <view class="uni-list-cell"> 
	                <view class="uni-list-cell-db">
	                    <picker @change="bindPickerChange" :value="index" :range="array">
	                        <view class="uni-input">{{array[index]}}<span style="float: right;"> &emsp;></span></view>
	                    </picker>
	                </view>
	            </view>
			</view>
			
			
			<view class="picture"><!-- //http://8.131.230.3:8080/YouGuang_wa -->
			<!-- <p style="font-family: Microsoft Yahei; text-align: center;color: rgba(136, 136, 136, 100);line-height: 398rpx;font-size: 50rpx;">添加图片</p> -->
				<!-- <image style="width: 694rpx;border-radius: 20rpx;" mode="aspectFit" src=""
				    @error="imageError"></image> -->
				<test></test>
					
			</view>
			
			
			<input class="input1" maxlength="20" focus placeholder="输入公告标题" />
			
			<!-- <input class="input2" maxlength="" focus placeholder="输入公告内容" /> -->
	     <view class="uni-textarea"style="height: 624rpx; background: #FFFFFF;">
		 <textarea class="input2" maxlength="400"  placeholder="输入公告内容 (最多400字)"  @blur="bindTextAreaBlur" auto-height />
		 </view>
	   <view class="btn-upload">
	   	 
	   	<view @click="addData">确认上传</view>
	   	 
	   </view>
	   
	   </view>
	   
</template>

<script>
	import { Upload } from '@/models/Upload/Upload.js'
	const upload = new Upload();
	
	import test from './test.vue'
	export default{
		data(){
			return{
				 // title: 'picker',
				 array: ['水果', '产品', '宣传'],
				 index: 0,
				 imgArr:[]
				
			}
		},
		components:{
			test
		},
		methods:{
		bindTextAreaBlur: function (e) {
			            console.log(e.detail.value)
			        },
		bindPickerChange: function(e) {
		            console.log('picker发送选择改变，携带值为', e.target.value)
		            this.index = e.target.value
		        },
		imageError: function(e) {
		    console.error('image发生error事件，携带值为' + e.detail.errMsg)
		},
		
		//确认上传
		addData: function(e){
			uni.showLoading({
				title: '正在加载...'
			})
			upload.uploadNotice({
				"ID":'',
				"title":"我是标题",
				"url":'',
				"article":'我是内容',
				"type":'水果'
				
			}
			).then(res => {
					console.log(res)
					this.array=res.data
					uni.hideLoading()
					
					
				})
				.catch(err => {
					console.log(err)
					uni.hideLoading()
					
				})	
		}
		
		}
	}
</script>

<style lang="scss" scoped>
	  page {
	        background-color: #efeff4;
	        height: 100%;
	        font-size: 28rpx;
	        line-height: 1.8;
	   .uni-list{
		   position: absolute;
		   top: 29rpx;
		   left: 28rpx;
			background: #FFFFFF; 
		   width: 182rpx;
		   height: 68rpx;
		   line-height:  68rpx;
		   color: rgba(16, 16, 16, 100);
		   font-size: 14px;
		   text-align: left;
		   border-radius: 5px;
		   font-family: Microsoft Yahei;
		   border: 1px solid rgba(255, 255, 255, 100);
	  
	  
		.uni-input{
			padding-right: 16rpx;
			padding-left: 36rpx;
		}
	  
	   }
	   .picture{
		   position: absolute;
		   left: 28rpx;
		   top: 125rpx;
		   width: 694rpx;
		   height: 398rpx;
		   overflow-y: scroll;
		   border-radius: 10px;
		   background-color: #FFFFFF;
	   }
	   
	   .input1{
		 
		  padding-left:20rpx;
		  padding-right:20rpx;
		 position: absolute;
		 left: 28rpx;
		 top: 544rpx;
		 width: 654rpx;
		 height: 90rpx;
		 border-radius: 10rpx;
		 color: rgba(136, 136, 136, 100);
		 font-size: 28rpx;
		 text-align: left;
		 font-family: Microsoft Yahei;
		 border: 2rpx solid rgba(255, 255, 255, 100);
		 background: #FFFFFF;
	   }
	   .input2{
		   margin: 0 auto;
		   letter-spacing:3rpx;
		   line-height: 60rpx;
		   
	   }
	   .uni-textarea{
		   overflow-y: scroll;
		   position: absolute;
		   left: 30rpx;
		   top: 662rpx;
		   width: 654rpx;
		   height: 500rpx;
		   padding-left:20rpx;
		   padding-right:20rpx;
		   padding-top: 20rpx;
		   padding-bottom: 20rpx;
		   border-radius: 10rpx;
		   background: #FFFFFF;
		   
		   color: rgba(136, 136, 136, 100);
		   font-size: 28rpx;
		   
		   font-family: Microsoft Yahei;
		   border: 2rpx solid rgba(255, 255, 255, 100);
	   }
	   .btn-upload{
		position: fixed;
		display: flex;
		width: 750rpx;
		height: 116rpx;
		
		bottom: 0;
		left: 0;
		background: #FFFFFF;
		
		view{
			
			align-self: center;
			margin: 0 auto;
			width: 694rpx;
			height: 88rpx;
			line-height: 88rpx;
			border-radius: 40rpx;
			color: rgba(255, 255, 255, 100);
			font-size: 40rpx;
			font-weight: 500;
			background-color: rgba(201, 166, 94, 100);
			text-align: center;
			border: 2rpx solid rgba(187, 187, 187, 100);
		}
	}
		}
	
</style>
