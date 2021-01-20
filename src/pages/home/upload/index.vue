<template>
	<view class="dia">
		    <view class="text">点击图标上传</view>
			<view class="item" v-for="item in items">
				<view class="content">
				<text>{{item.name}}</text>
				<text>{{item.content}}</text>
				</view>
				<view class="icon" @click="takePhoto(item.id)" >
					{{item.icon}}
				</view>
			</view>
		
			
		<view class="box">
			<button class="button" @click="close">取消</button>
			
		</view>
		
		
	</view>
</template>

<script>

	
	export default{
		name:"uniPopupDefine",
		 inject: ['popup'],
		 data(){
		 	return{
		 	
				studentId:1,
				items:[{
					name:'相册',
					content:'从相册中选择照片上传',
					icon:'图标1',
					id:1
				},
				{
					name:'拍照',
					content:'选择拍照上传',
					icon:'图标2',
					id:2
				}
				
				],
			
		 	}
		 },
		 
		 methods:{
			select(item, index) {
				this.$emit('select', {
					item,
					index
				}, () => {
					this.popup.close()
				})
			},
			
			/**
			 * 关闭窗口
			 */
			close() {
				this.popup.close()
			},
	onLoad(){
		console.log(this.studentId)
	},
			// 上传图片
			takePhoto(e){
				
				// 获取摄像头的权限
					// uni.authorize({
					   //  scope: 'scope.camera',
					   //   success(res) {
							 // console.log(res)
					             // if (res.authSetting['scope.camera']) {
					             //             console.log("已授权")
					             // 如果已授权,直接获取对应参数
													
													
									// 选择上传
									uni.chooseImage({
									      count: 1,
									      sizeType: ['original', 'compressed'],
									      sourceType:(e==1)? ['album']:['camera '],
									      success: function(res) {
											   console.log(res)
										const file =res.tempFilePaths[0];
										console.log(file)
										
										// 自己设置的学号
										const studentId=1
										uni.uploadFile({
										url:'http://8.131.230.3:8080/YouGuang_war/Img/uploadImg',
										filePath: file,
										formData: {
										studentId:studentId
										},	
										success: (res) => {
										console.log(res);
										},
										fail:(res)=>{
											console.log(res);
										}
									});												
									      }
									      })
					//权限						
									
						// }
						//  })                        
					    
					},
					
	}}
</script>

<style lang="scss">
	
	.dia{
		.text{
			text-align: center;
			color: #C9A65E;
		}
		background: rgba(255, 255, 255, 0.9);
		border-radius: 0.625rem;
		height:21rem;
		width: 360px;
		margin: 0 auto;
		.item{
			height: 30%;
			width: 95%;
			display: flex;
			justify-content: space-between;
			margin: 5% auto;
			background: white;
			border-radius: 0.625rem;
			.content{
				display: flex;
				flex-direction: column;	
				margin: 5% 10% 10% 10%;
				text:nth-child(1){
					font-size: 1.125rem;
					font-weight: bold;
					margin-bottom: 15%;
				}
				text:nth-child(2){
					color: gray;
					font-size: 0.75rem;
				}
			}
			.icon{
				margin: 10% 10% 10% 10%;
			}
		}
		
		
		.box {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			padding: 10px 15px;
		}
		
		.button {
			flex: 1;
			border-radius: 50px;
			color: #666;
			font-size: 16px;
		}
		
		.button::after {
			border-radius: 50px;
		}
		
	}
	
	
</style>
