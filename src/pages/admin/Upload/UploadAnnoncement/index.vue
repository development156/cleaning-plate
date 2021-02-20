<template>
	  <view>
	        
	        <view class="uni-list">
	            <view class="uni-list-cell"> 
	                <view class="uni-list-cell-db">
	                    <picker @change="bindPickerChange" :value="index" :range="array">
							<view class="uni-input" >{{array[index]}}<span style="float: right;"> &emsp;></span></view>
	                    </picker>
	                </view>
	            </view>
			</view>
			
			
			<view class="picture">
			<!-- <p style="font-family: Microsoft Yahei; text-align: center;color: rgba(136, 136, 136, 100);line-height: 398rpx;font-size: 50rpx;">添加图片</p> -->
				<!-- <image style="width: 694rpx;border-radius: 20rpx;" mode="aspectFit" src=""
				    @error="imageError"></image> -->
				<!-- 上传照片 -->
				     <uploadImg  @addPictrue="addPic($event)"></uploadImg>
				 <!-- end -->
	
			</view>
			
			
		<input class="input1" v-model="notice.title" maxlength="20"  focus placeholder="输入公告标题" />
			<!-- <input class="input2" maxlength="" focus placeholder="输入公告内容" /> -->
	     <view class="uni-textarea"style=" margin-bottom: 130rpx;">
		 <textarea class="input2" maxlength="400" style="height: 670rpx; background: #EEEEEE;"  v-model="notice.article"  placeholder="输入公告内容 (最多400字)"  @blur="bindTextAreaBlur" auto-height />
		 </view>
	   
	   <view class="btn-upload"> 
	   	<view @click="addData">确认上传</view>
	   </view>
	   
	   </view>
	   
</template>

<script>
	import { AnnoncementUpload } from '@/models/admin/Upload/annoncementUpload.js'
	const upload = new AnnoncementUpload();
	
	import uploadImg from './components/uploadImg.vue'
	
	// import test from './test.vue'
	export default{
		data(){
			return{
				 // title: 'picker',
				 array: ['水果', '产品', '宣传'],
				 index: 0,
				 //imgArr:[],
				 notice:{
						"title":"",//我是标题
						"urlList":this.photoFiles,
						"article":'',//我是内容
						"type":'',
				},
				photoFiles: [
				    ],
				
			}
		},
		components:{
			uploadImg
		},
		methods:{
		addPic:function(data){
			// console.log("data")
			// console.log(data)
			 // photoFiles.push(img);
			this.photoFiles=data;
		},
		bindTextAreaBlur: function (e) {
			            console.log(e.detail.value)
			},
		bindPickerChange: function(e) {
		            console.log('picker发送选择改变，携带值为', e.target.value)
		            this.index = e.target.value;//水果1  产品2  宣传3
					this.notice.type = this.array[this.index];
					
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
		// /**88888888888888888888
		//              * 上传图片
		//              */
		//             getUploadImg: function(e) {
		//                 var idx = e.target.dataset.idx;
		                
		//                 var ths = this;
		//                 wx.chooseImage({
		//                     count: 1,
		//                     // 默认9
		// 					 sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
		//                     sizeType: ['compressed'],
		//                     sourceType: ['album','camera'],//, 'camera'
		//                     success: function(res) {
								
		// 						 // 图片的本地临时文件路径列表
		// 						 var tempFilePaths = res.tempFilePaths[0];	
								 
		// 						     uni.showLoading({
		// 								mask: true
		// 						    });
							
		// 						upload.uploadPictrue(tempFilePaths).then( res2 => {
		// 							console.log("res2")
		// 								console.log(res2)
		// 									setTimeout(()=>{
		// 										uni.hideLoading()
		// 									},180);
																				
		// 									if (res2[1].statusCode == 200){
		// 									    // console.log('文件上传成功')
		// 										uni.showToast({
		// 											title: '上传成功',
		// 											icon:'none',
		// 											duration: 1080
		// 										});
		// 									}else{
		// 										uni.showToast({
		// 											title: '上传失败!',
		// 											icon:'none',
		// 											duration: 1200
		// 										});
		// 									}
														
		// 												 var img = {};
		// 												 img.path = JSON.parse(res2[1].data).data;
		// 												 // img.url = JSON.parse(res2[1]).resourcesUrl + JSON.parse(res2[1]).filePath;
		// 												 var photoFiles = ths.photoFiles;
														 
		// 												 photoFiles.push(img);
		// 												 // ths.setData({
		// 												 //   photoFiles: photoFiles
		// 												 // });
														
		// 												 ths.photoFiles= photoFiles
														
													
		// 						                // }
		// 					 }).catch(err => {
		// 							console.log(err)
		// 									})	;//这里结束
		// 				},
		// 				})
		// 			},
		//             /**
		//              * 图片点击预览
		//              */
		//             refundPicPreView(e) {
		//                 var current = e.currentTarget.dataset.cur
		//                 var urls = []
		//                 this.photoFiles.forEach(el => {
		//                     urls.push(el.url)
		//                 })
		//                 uni.previewImage({
		//                     current: current,
		//                     urls: urls
		//                 })
		//             },
		
		//             /**
		//              * 删除图片
		//              */
		//             removeImage: function(e){
		//                 var idx = e.currentTarget.dataset.idx;
		//                 var photoFiles = this.photoFiles;
		//                 photoFiles.splice(idx, 1);
		//                 // this.setData({
		//                 //     photoFiles: photoFiles
		//                 // })
		// 				this.photoFiles=photoFiles
		//             },
					
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
			text-shadow: 5px 5px 5px #CD853F;
		}
	  
	   }
	   .picture{
		   position: absolute;
		   // border: 2rpx solid #EEEEEE;
		   left: 28rpx;
		   top: 125rpx;
		   width: 694rpx;
		   height: 398rpx;
		   overflow-y: scroll;
		   border-radius: 10px;
		   background-color: #EEEEEE;
		   box-shadow: 3rpx 4rpx 15rpx #555555;
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
		 border: 2rpx solid #C0C0C0;
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
		   min-height: 570rpx;
		   padding-left:20rpx;
		   padding-right:20rpx;
		   padding-top: 30rpx;
		   padding-bottom: 20rpx;
		   border-radius: 10rpx;
		   background: #FFFFFF;
		   
		   color: rgba(136, 136, 136, 100);
		   font-size: 28rpx;
		   
		   font-family: Microsoft Yahei;
		   border: 2rpx solid #C0C0C0;
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
