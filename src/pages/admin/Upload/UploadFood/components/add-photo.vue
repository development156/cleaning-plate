<template>
    <view>
  <view>
   <!-- <progress :percent="percent" stroke-width="10"></progress> -->
  </view>
  <view>
   <button class="photo"   :loading="loading"  :disabled="disabled" @click="upload">+</button>
  </view>
 </view>
 
</template>
<script>
	import { FoodUpload } from '@/models/admin/Upload/foodUpload.js'
	const upLoad = new FoodUpload();
	
	var _self;
export default {
 data(){
		return{
			disabled:false,
			percent:0,
			loading:false,
		}
  
  
 },
 methods : {
  upload : function(){
   _self = this;
  
   uni.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album'], //从相册选择
    success: function (res) {
		console.log("success")
		console.log(res)
		
	uni.showLoading({
	    title: '加载中'
	});
	
     const tempFilePaths = res.tempFilePaths;
	 const tempFilePath= tempFilePaths[0];
     const uploadTask = upLoad.uploadPicture(//{
      // url : '',
      // filePath: tempFilePaths[0],
      // name: 'file',
	  tempFilePath
    
//     }
	 ).then(res => {
		 
		 console.log("chooseImage")
		 console.log(res)
		 // success: function (uploadFileRes) {  
			if(JSON.parse(res[1].data).code==200){
				uni.hideLoading();
		  // console.log(JSON.parse(res[1].data));
		   var imgPath=JSON.parse(res[1].data).data;
			_self.$emit("photoShow",imgPath)
			uni.showToast({
				title: '上传成功',
				icon:'none',
				duration: 1080
			});
			
		  }
		 
	 }).catch(err => {
		
			uni.showModal({
						content: err,
						showCancel: false
						});
			
	   	})	;
 
     // uploadTask.onProgressUpdate(function (res) {
     //  _self.percent = res.progress;
     //  console.log('上传进度' + res.progress);
     //  console.log('已经上传的数据长度' + res.totalBytesSent);
     //  console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
     // });
    },
    error : function(e){
		console.log("---------error--------");
     console.log(e);
    }
   });
  }
 },
    onLoad:function(){
  
    }
}
</script>

<style lang="scss" scoped>
	.photo{
		font-family: Microsoft Yahei;
		font-weight: 500;
		color: #F9F9F9 ;
		font-size: 100rpx;
		width: 260rpx;
		height: 260rpx;
		line-height: 260rpx;
		border-radius: 10px;
		background: #EBEBEB;
		z-index: 0;
	}
</style>