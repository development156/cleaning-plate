<template>
	<view class="dia">

		<view class="text">点击图标上传</view>
		<view class="item" >
			<view class="content">
				<text>相册</text>
				<text>从相册中选择照片上传</text>
			</view>
			<view class="iconfont icon-xiangce icon" @click="takePhoto(1)" style="font-size: 2.5rem;">
				
			</view>
		</view>
		
		<view class="item" >
			<view class="content">
				<text>拍照</text>
				<text>选择拍照上传</text>
			</view>
			<view class="iconfont icon-V icon" @click="takePhoto(2)" style="font-size: 3rem;">
			
			</view>
		</view>
		
		

		<view class="box">
			<button class="button" @click="close">取消</button>

		</view>
		<compress ref="compress" />

	</view>
</template>

<script>
	import compress from '@/components/common/compress.vue'

	export default {
		name: "uniPopupDefine",
		inject: ['popup'],
		data() {
			return {

				studentId: 1
			}
		},
		components: {
			compress
		},
		methods: {
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
			onLoad() {
				console.log(this.studentId)
			},
			// 上传图片
			takePhoto(e) {

				// 获取摄像头的权限
				let _this = this
				uni.authorize({
					scope: 'scope.camera',
					success(res) {
						console.log(res)

						console.log("已授权")
						// 上传时的请求头
						let Authorization = uni.getStorageSync('AuthTokens')

						// 选择上传
						uni.chooseImage({
							count: 1,
							sizeType: ['compressed'],
							sourceType: (e == 1) ? ['album'] : ['camera '],
							success: function(res) {
								console.log(res)
								// 要压缩的地址
								const compressParams = {
									src: res.tempFilePaths[0]
								}
								_this.$refs.compress.compress(compressParams).then(file => {
									uni.uploadFile({
										url: 'http://8.129.51.225:8080/YouGuang_war/Img/uploadImg',
										filePath: file,
										name: 'file',
										header: {
											'Authorization': Authorization
										},
										success: (res) => {
											const data = JSON.parse(res.data)
											console.log(data)
											uni.showToast({
												title: data.msg,
												icon: "none"
											});
										},
										fail: (res) => {
											console.log(res);
										}
									});

								})

							}
						})

					}
				})

			},

		}
	}
</script>

<style lang="scss">
	.dia {
		.text {
			text-align: center;
			color: #C9A65E;
		}

		background: rgba(255, 255, 255, 0.9);
		border-radius: 0.625rem;
		height:21rem;
		width: 360px;
		margin: 0 auto;

		.item {
			height: 30%;
			width: 98%;
			display: flex;
			justify-content: space-between;
			margin: 5% auto;
			background: white;
			border-radius: 0.625rem;

			.content {
				display: flex;
				flex-direction: column;
				margin: 5% 10% 10% 10%;

				text:nth-child(1) {
					font-size: 1.125rem;
					font-weight: bold;
					margin-bottom: 15%;
				}

				text:nth-child(2) {
					color: gray;
					font-size: 0.75rem;
				}
			}

			.icon {
				margin: 5% 10% 10% 10%;
					color: #C9A65E;
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
