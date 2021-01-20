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
				<!-- 上传照片 -->
				                <view class="upload-img">
				                    <!-- 预览缩略图 -->
				                    <view class="q-image-wrap">
				                        <!-- 图片缩略图  -->
				                        <block v-for="(imgItem, idx) in photoFiles" :key="idx">
				                            <view class="item">
				                                <image class="q-image" :src="imgItem.url" mode="aspectFill" :data-cur="imgItem.url" @tap="refundPicPreView"></image>
				                                </image>
				                                <!-- 移除图片的按钮  -->
				                                <view class="q-image-remover" :data-idx="idx" @tap="removeImage">
				                                    <!-- <text>x</text> -->
				                                    <image src="../../../../static/images/tabbar/home-selected.png" mode=""></image>
				                                </view>
				                            </view>
				                        </block>
				                        <!-- 添加图片图标 -->
				                        <view class="item" v-if="photoFiles.length < 6" @tap="getUploadImg">
				                            <image class="q-image" src="../../../../static/images/common/default-avatar.png" mode="">
				                            </image>
				                        </view>
				                    </view>
				               
				            </view>
				            <!-- end -->
	
			</view>
			
			
		<input class="input1" v-model="notice.title" maxlength="20" focus placeholder="输入公告标题" />
			<!-- <input class="input2" maxlength="" focus placeholder="输入公告内容" /> -->
	     <view class="uni-textarea"style="height: 624rpx; background: #FFFFFF;">
		 <textarea class="input2" maxlength="400" v-model="notice.article"  placeholder="输入公告内容 (最多400字)"  @blur="bindTextAreaBlur" auto-height />
		 </view>
	   
	   <view class="btn-upload"> 
	   	<view @click="addData">确认上传</view>
	   </view>
	   
	   </view>
	   
</template>

<script>
	import { AnnoncementUpload } from '@/models/admin/Upload/annoncementUpload.js'
	const upload = new AnnoncementUpload();
	
	// import test from './test.vue'
	export default{
		data(){
			return{
				 // title: 'picker',
				 array: ['水果', '产品', '宣传'],
				 index: 0,
				 //imgArr:[],
				 notice:{
						"ID":'',
						"title":"我是标题",
						"url":this.photoFiles,
						"article":'我是内容',
						"type":'',
				},
				photoFiles: [
				    {url: "",id:1},
				    {url: "",id:2},
					{url: "",id:3},
					{url: "",id:4},
					{url: "",id:5},
					{url: "",id:6},
				    
				    ],
				
			}
		},
		components:{
			// test
		},
		methods:{
		bindTextAreaBlur: function (e) {
			            console.log(e.detail.value)
			},
		bindPickerChange: function(e) {
		            console.log('picker发送选择改变，携带值为', e.target.value)
		            // this.index = e.target.value;//水果1  产品2  宣传3
					this.notice.type = e.target.value;
		        },
		imageError: function(e) {
		    console.error('image发生error事件，携带值为' + e.detail.errMsg)
		},
		
		//确认上传
		addData: function(e){
			uni.showLoading({
				title: '正在加载...'
			})
			upload.uploadNotice(this.notice).then(res => {
					console.log(res)
					uni.hideLoading()
					this.array=res.data
					
					uni.showToast({
					    title: '上传成功',
					    duration: 1400
					});
					this.photoFiles=''
					this.notice=''
					
	
				})
				.catch(err => {
					console.log(err)
					uni.hideLoading()
				})	
		},
		/**
		             * 上传图片
		             */
		            getUploadImg: function(e) {
		                var idx = e.target.dataset.idx;
		                console.log(idx);
		                var ths = this;
		                wx.chooseImage({
		                    count: 1,
		                    // 默认9
		                    sizeType: ['compressed'],
		                    sourceType: ['album', 'camera'],
		                    success: function(res) {
		                        // 图片的本地临时文件路径列表
		                        var tempFilePaths = res.tempFilePaths;
		                        uni.showLoading({
		                            mask: true
		                        });
		                        var params = {
		                          url: "",////上传的路径
		                          filePath: tempFilePaths[0],
		                          name: 'file',
		                          callBack: function (res2) {
		                            uni.hideLoading()
		                            var img = {};
		                            img.path = JSON.parse(res2).filePath;
		                            img.url = JSON.parse(res2).resourcesUrl + JSON.parse(res2).filePath;
		                            var photoFiles = ths.photoFiles;
		                            photoFiles.push(img);
		                            ths.setData({
		                              photoFiles: photoFiles
		                            });
		                          }
		                        };
		                        http.upload(params);
		                    }
		                });
		            },
		            /**
		             * 图片点击预览
		             */
		            refundPicPreView(e) {
		                var current = e.currentTarget.dataset.cur
		                var urls = []
		                this.photoFiles.forEach(el => {
		                    urls.push(el.url)
		                })
		                uni.previewImage({
		                    current: current,
		                    urls: urls
		                })
		            },
		
		            /**
		             * 删除图片
		             */
		            removeImage: function(e){
		                var idx = e.currentTarget.dataset.idx;
		                var photoFiles = this.photoFiles;
		                photoFiles.splice(idx, 1);
		                this.setData({
		                    photoFiles: photoFiles
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
	
	
	.item-num .upload-img {
	    padding: 20rpx 10rpx 20rpx 10rpx;
	}
	
	.item-num .upload-img .q-image-wrap {
	    display: flex;
	    /* height: 500rpx; */
	    flex-wrap: wrap;
	}
	
	.item-num .upload-img .q-image-wrap .item {
	    position: relative;
	    height: 200rpx;
	    width: 200rpx;
	    margin-right: 20rpx;
	    margin-bottom: 20rpx;
	}
	
	.item-num .upload-img .q-image-wrap .item .q-image {
	    height: 200rpx;
	    width: 200rpx;
	}
	
	.item-num .upload-img .q-image-wrap .item .q-image-remover {
	    width: 0;
	    height: 0;
	    border-top: 66rpx solid #bfde85;
	    border-left: 66rpx solid transparent;
	    position: absolute;
	    top: 0;
	    right: 0;
	}
	
	/* .item-num .upload-img .q-image-wrap .item .q-image-remover text{
	    width: 30rpx;
	    display: block;
	    height: 30rpx;
	    color: #FFFFFF;
	    text-align: center;
	    line-height: 30rpx;
	    font-size: 30rpx;
	    border-radius: 20rpx;
	    background-color: #bfde85;
	    position: absolute;
	    top: -60rpx;
	    right: 0;
	} */
	
	.item-num .upload-img .q-image-wrap .item .q-image-remover image {
	    width: 24rpx;
	    height: 24rpx;
	    position: absolute;
	    top: -60rpx;
	    right: 4rpx;
	}
	}
	
</style>
