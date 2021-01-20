<template>
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
</template>

<script>
	export default{
		data() {
		       return {
		            photoFiles: [
		                {url: "",id:1},
		                {url: "",id:2},
						{url: "",id:3},
						{url: "",id:4},
						{url: "",id:5},
						{url: "",id:6},
		                
		                ], //凭证图片列表
		            };
		    },
		methods:{
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

<style scoped >

	
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
</style>
