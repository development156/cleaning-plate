<template>
	<view>
		<textarea class="input"  v-model="notice.product.name" maxlength="300" auto-focus="autofocus"  placeholder="输入商品名称"   @blur="bindTextAreaBlur" />
		<!-- v-model -->
		
	<!-- 上传照片 -->
	                <view class="upload-img">
	                    <!-- 预览缩略图 -->
	                    <view class="q-image-wrap">
	                        <!-- 图片缩略图  -->
	                        <block v-for="(imgItem, idx) in photoFiles" :key="idx">
	                            <view class="item">
	                                <image class="q-image" :src="imgUrl+'/'+imgItem.url"  mode="aspectFill" :data-cur="imgUrl+'/'+imgItem.url" @tap="refundPicPreView"></image>
	                                </image>
	                                <!-- 移除图片的按钮  -->
	                                <view class="q-image-remover" :data-idx="idx" @tap="removeImage">
	                                    <text>x</text>
	                                    <image  src="../../../../../static/images/tabbar/feedback.png" mode="aspectFill"></image>
	                                </view>
	                            </view>
	                        </block>
	                        <!-- 添加图片图标 -->
	                        <view class="item" v-if="photoFiles.length < 6" @tap="getUploadImg">
	                            <image class="q-image" src="../../../../../static/images/common/default-avatar.png" mode="aspectFill">
	                            </image>
	                        </view>
	                    </view>
	               
	            </view>
	            <!-- end -->
			
		<view class="goods-info">
			<span class="item1">
					<span>价格(元)</span>
					<span><input class="input" placeholder="输入价格" v-model='notice.product.univalence' /></span>
			</span>
			<span class="item3">
					<span>产地</span>
					<span><input class="input"  placeholder="输入产地" v-model='notice.product.ProductionPlace' /></span>
			</span>
			<span class="item2">
					<span>销量</span>
					<span><input class="input"  v-model='notice.product.sales' /></span>
			</span>
		</view>
				
		<view>
			<button class="addGoods" @click="send">发布</button>
		</view>
	</view>
</template>

<script>
	import { ManageGoods } from '@/models/admin/Management/ManageGoods/manageGoods.js'
	const manageGoods = new ManageGoods();
	
	export default{
		data() {
			 return {
			    photoFiles: [
			         // {url: "",id:1},
			    	 ], //凭证图片列表
			    notice:{
			    	"product":{
						"name":"",//商品名称
						
						"integrate":'',//积分
						"univalence":'',//单价
						"state":'',//用于判断该产品的存在状态
						"flag":'2',//判断是积分兑换，还是用户自己支付
						"sales":'0'//销量
					},
					"productionImgList":'',
			    },    
			 };
				
			 },
		created() {
			this.notice.product.flag=2; //用户自己支付
		},
		methods:{
			send:function(){
			
				uni.showLoading({
					title: '正在加载...'
				})
				var th=this;
				manageGoods.addGoods(this.notice).then(res => {
						
						uni.hideLoading()
						// this.array=res.data
						if(res.code==200){
						uni.showToast({
						    title: '上传成功',
						    duration: 1400
						});
						th.photoFiles=''
						th.notice=''
						
						setTimeout(function(){ 
							let a = th.$router.go(1)
							if (a == undefined) {
							//重新定向跳转页面
							uni.reLaunch({
								url: '../index'
							})
							}
							
						}, 1410);
						}
					})
					.catch(err => {
						
						console.log(err)
						uni.showToast({
						    title: '上传失败',
						    duration: 1400
						});
						uni.hideLoading()
					})		
				
				
				
				
				
			},
			bindTextAreaBlur: function (e) {
			            // console.log(e.detail.value)
			},
			
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
					
						manageGoods.uploadPictrue(tempFilePaths).then( res2 => {
							
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
									 img.url = JSON.parse(res2[1].data).data;
									 // img.url = JSON.parse(res2[1]).resourcesUrl + JSON.parse(res2[1]).filePath;
									 var photoFiles = ths.photoFiles;
									 
									 photoFiles.push(img);
									ths.photoFiles= photoFiles
									
									// ths.notice.productionImgList=ths.photoFiles
									ths.addToNotice(ths.photoFiles);
									 
					 }).catch(err => {
							console.log(err)
									})	;//这里结束
				},
				})
			},
			
			// 把phtofiles添加到notice中
			addToNotice(photoFiles){
				
				this.notice.productionImgList=photoFiles;
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
				this.photoFiles=photoFiles;
				this.notice.productionImgList=photoFiles;
			
			  },
		                    
		},
	}
</script>

<style scoped lang="scss">
	page{
		display: flex;
		width: 750rpx;
		flex-direction: column;
		justify-content: center;
		.input{
			
			width: 85%;
			height: 170rpx;
			margin: auto;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			color:  rgba(182, 182, 182, 100);
			
			font-size: 32rpx;
			text-align: left;
			font-family: Microsoft Yahei;
			border: 2rpx solid rgba(255, 255, 255, 100);
			
		}
	
	
	// 上传图片
	.upload-img {
	    
		width: 90%;
		height: 250rpx;
		 
		// background: #2C405A;
		margin: auto;
		
		border-bottom: 2rpx solid rgba(255, 255, 255, 100);
		.q-image-wrap {
			
		    display: flex;
		    flex-wrap: wrap;
			overflow-y: scroll;
			height: 90%;
			
			
			.item {
				background: #F1F1F1;
			    position: relative;
				
			    height: 210rpx;
			    width: 210rpx;
				border-radius: 20rpx;
			    margin: 9rpx;
			    // margin-buttom: 18rpx;
				.q-image {
				    height: 210rpx;
				    width: 210rpx;
				    border-radius: 20rpx;
				}
				.q-image-remover {
				    width: 0;
				    height: 0;
				    border-top: 66rpx solid #bfde85;
				    border-left: 66rpx solid transparent;
				    position: absolute;
				    top: 0;
				    right: 0;
					text{
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
					}
					image {
					    width: 24rpx;
					    height: 24rpx;
					    position: absolute;
					    top: -60rpx;
					    right: 4rpx;
					}
				}
			}
		}
	}
	
	.goods-info{
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
	
		padding: 20rpx;
		height: 200rpx;
		width: 88%;
		margin: auto;
		
		border-top: 3rpx solid #BBBBBB ;
		
		.item1,.item2,.item3{
			display: flex;
			justify-content: space-between;
			font-size: 32rpx;
			
			span:nth-child(1){
				color: rgba(16, 16, 16, 100);
			
			}
			// span:nth-child(2){
			
			 
				.input{
					display: inline;
					width: 100upx;
					border: 2rpx ;
					text-align: right;
					font-size: 30rpx;
				color: rgba(222, 24, 35, 100);
				}
			// }
		}
		
	}

	
	.addGoods{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 750rpx;
		height: 8%;
		
		background-color: rgba(201, 166, 94, 100);
		text-align: center;
		color: rgba(255, 255, 255, 100);
		font-size: 40rpx;
		
		border: 2rpx solid rgba(255, 255, 255, 100);
	}
	}
</style>
