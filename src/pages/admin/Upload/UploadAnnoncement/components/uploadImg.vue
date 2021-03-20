<template>
	<!-- 上传照片 -->
	           <view class="upload-img" style=" width: 100%; height: 100%; text-align: center;">
	                   
	                   <view class="q-image-wrap" style="height: 100%; ">
	                       
	                       <block v-for="(imgItem, idx) in photoFiles" :key="idx">
	                           <view class="item" style=" margin: 0; position: relative;  padding: 0;">
	                               <image  class="q-image" :src="imgurl+imgItem.path" mode="aspectFit" :data-cur="imgItem.url" @tap="refundPicPreView"></image>
	                               </image>
	                               
	                               <view class="q-image-remover" :data-idx="idx"
	           					 style=" width: 0rpx;
	           						height: 0rpx;
	           						border-top: 86rpx solid #bfde85;
	           						border-left: 86rpx solid transparent;
	           						position: absolute;
	           						top: 8rpx;
	           						right: 25rpx;
	           						
	           						"
	           					 @tap="removeImage">
	                                   <text style="position: absolute;
	           						top: -69rpx;
									color: #F2F2F2;
	           						right: 14rpx;">x</text>
	                               <!--    <image  class="image"
	           						style="
	           						width: 30rpx;
	           						height: 30rpx;
	           						position: absolute;
	           						top: -69rpx;
	           						right: 14rpx;"
	           						src="../../../../../static/images/tabbar/home-selected.png" mode="aspectFit"></image>
	           						-->
	                               </view>
	                           </view>
	                       </block>
	                       
	                       <view class="item"  v-if="photoFiles.length < 6" @tap="getUploadImg">
	                          <image 
	           				style=" padding: 0; width: 100%; 	   height: 398rpx;"
	           				 class="q-image" src="../../../../../static/images/common/default-avatar.png" mode="aspectFit">
	                           </image>
	                       </view>
	                   </view>
	              
	           </view>
	            <!-- end -->
</template>

<script>
	import { AnnoncementUpload } from '@/models/admin/Upload/annoncementUpload.js'
	const upload = new AnnoncementUpload();
	export default{
		name:'uploadImg',
		onReady(){
			this.imgurl = this.imgUrl;
		},
		data() {
		       return {
				   imgurl:'',
		            photoFiles: [
		                // {url: "",id:1},
		    //             {url: "",id:2},
						// {url: "",id:3},
						// {url: "",id:4},
						// {url: "",id:5},
						// {url: "",id:6},
		                
		                ], //凭证图片列表
		            };
		    },
		methods:{
		/**
		                       * 上传图片
		                       */
		                      getUploadImg: function(e) {
		                          var idx = e.target.dataset.idx;
		                          
		                          var ths = this;
		                          wx.chooseImage({
		                              count: 1,
		                              // 默认9
		          					 sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
		                              sizeType: ['compressed'],
		                              sourceType: ['album','camera'],//, 'camera'
		                              success: function(res) {
		          						
		          						 // 图片的本地临时文件路径列表
		          						 var tempFilePaths = res.tempFilePaths[0];	
		          						 
		          						     uni.showLoading({
		          								mask: true
		          						    });
		          					
		          						upload.uploadPictrue(tempFilePaths).then( res2 => {
		          							
		          									setTimeout(()=>{
		          										uni.hideLoading()
		          									},180);
		          																		
		          									if (res2[1].statusCode == 200){
		          									    // console.log('文件上传成功')
		          										uni.showToast({
		          											title: '上传成功',
		          											icon:'none',
		          											duration: 1080
		          										});
		          									}else{
		          										uni.showToast({
		          											title: '上传失败!',
		          											icon:'none',
		          											duration: 1200
		          										});
		          									}
		          												 var img = {};
		          												 img.path = JSON.parse(res2[1].data).data;
		          												 // img.url = JSON.parse(res2[1]).resourcesUrl + JSON.parse(res2[1]).filePath;
		          												 var photoFiles = ths.photoFiles;
		          												 
		          												 photoFiles.push(img);
		          												ths.photoFiles= photoFiles
																ths.$emit("addPictrue",photoFiles)
		          												
		          											
		          						                // }
		          					 }).catch(err => {
		          							console.log(err)
		          									})	;//这里结束
		          				},
		          				})
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
		                          // this.setData({
		                          //     photoFiles: photoFiles
		                          // })
		          				this.photoFiles=photoFiles
		                      },
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
	
	.item-num .upload-img .q-image-wrap .item .q-image-remover .image {
	    width: 24rpx;
	    height: 24rpx;
	    position: absolute;
	    top: -60rpx;
	    right: 4rpx;
	}
</style>
